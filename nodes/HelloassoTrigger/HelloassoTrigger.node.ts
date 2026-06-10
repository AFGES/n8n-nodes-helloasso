import { createHmac, timingSafeEqual } from 'crypto';
import {
	NodeConnectionTypes,
	type IDataObject,
	type IHookFunctions,
	type IHttpRequestMethods,
	type INodeType,
	type INodeTypeDescription,
	type IWebhookFunctions,
	type IWebhookResponseData,
} from 'n8n-workflow';

type NotificationType = 'Order' | 'Payment' | 'Form' | 'Organization';

interface ApiUrlNotification {
	url?: string | null;
	apiNotificationType?: NotificationType | null;
	signatureKey?: string | null;
}

interface TriggerStaticData extends IDataObject {
	signatureKeys?: Record<string, string>;
}

const BASE_URL = 'https://api.helloasso.com/v5';

/** Builds the notification endpoint base for the configured scope. */
function notificationsUrl(this: IHookFunctions): string {
	const scope = this.getNodeParameter('scope', 'global') as string;
	if (scope === 'organization') {
		const slug = this.getNodeParameter('organizationSlug', '') as string;
		return `${BASE_URL}/partners/me/api-notifications/organizations/${encodeURIComponent(slug)}`;
	}
	return `${BASE_URL}/partners/me/api-notifications`;
}

async function apiRequest(
	this: IHookFunctions,
	method: IHttpRequestMethods,
	url: string,
	body?: IDataObject,
	qs?: IDataObject,
): Promise<IDataObject> {
	return (await this.helpers.httpRequestWithAuthentication.call(this, 'helloassoOAuth2Api', {
		method,
		url,
		body,
		qs,
		json: true,
	})) as IDataObject;
}

export class HelloassoTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'HelloAsso Trigger',
		name: 'helloassoTrigger',
		icon: { light: 'file:../Helloasso/helloasso.svg', dark: 'file:../Helloasso/helloasso.dark.svg' },
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["scope"]}}',
		description: 'Starts the workflow when HelloAsso sends a notification',
		defaults: {
			name: 'HelloAsso Trigger',
		},
		usableAsTool: true,
		inputs: [],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'helloassoOAuth2Api', required: true }],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Scope',
				name: 'scope',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Global',
						value: 'global',
						description: 'Receive notifications for every organization the API client can access',
					},
					{
						name: 'Organization',
						value: 'organization',
						description: 'Receive notifications for a single organization',
					},
				],
				default: 'global',
			},
			{
				displayName: 'Organization Slug',
				name: 'organizationSlug',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'my-association',
				displayOptions: { show: { scope: ['organization'] } },
				description: 'The organization slug (its identifier in HelloAsso URLs)',
			},
			{
				displayName: 'Events',
				name: 'events',
				type: 'multiOptions',
				required: true,
				default: ['Order', 'Payment', 'Form', 'Organization'],
				description: 'The notification types to subscribe to',
				options: [
					{ name: 'Form', value: 'Form', description: 'A form (campaign) was created' },
					{ name: 'Order', value: 'Order', description: 'An order was created' },
					{
						name: 'Organization',
						value: 'Organization',
						description: 'An organization name or slug changed',
					},
					{
						name: 'Payment',
						value: 'Payment',
						description: 'A payment was authorized, refunded, refused or contested',
					},
				],
			},
			{
				displayName: 'Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				options: [
					{
						displayName: 'Verify Signature',
						name: 'verifySignature',
						type: 'boolean',
						default: true,
						description:
							'Whether to verify the x-ha-signature header (HMAC-SHA256) against the signature key returned at registration',
					},
				],
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const events = this.getNodeParameter('events', []) as NotificationType[];
				const webhookUrl = this.getNodeWebhookUrl('default');

				const partner = await apiRequest.call(this, 'GET', `${BASE_URL}/partners/me`);
				const registered = (partner.urlNotificationList as ApiUrlNotification[] | undefined) ?? [];

				return events.every((event) =>
					registered.some(
						(entry) => entry.url === webhookUrl && entry.apiNotificationType === event,
					),
				);
			},

			async create(this: IHookFunctions): Promise<boolean> {
				const events = this.getNodeParameter('events', []) as NotificationType[];
				const webhookUrl = this.getNodeWebhookUrl('default');
				const url = notificationsUrl.call(this);

				const staticData = this.getWorkflowStaticData('node') as TriggerStaticData;
				const signatureKeys: Record<string, string> = {};

				for (const notificationType of events) {
					const response = await apiRequest.call(this, 'PUT', url, {
						url: webhookUrl,
						notificationType,
					});
					if (typeof response.signatureKey === 'string') {
						signatureKeys[notificationType] = response.signatureKey;
					}
				}

				staticData.signatureKeys = signatureKeys;
				return true;
			},

			async delete(this: IHookFunctions): Promise<boolean> {
				const events = this.getNodeParameter('events', []) as NotificationType[];
				const url = notificationsUrl.call(this);

				for (const notificationType of events) {
					try {
						await apiRequest.call(this, 'DELETE', url, undefined, { notificationType });
					} catch (error) {
						// Tolerate per-type failures so deactivation never hard-fails.
						this.logger.warn(
							`HelloAsso Trigger: failed to remove ${notificationType} notification: ${
								(error as Error).message
							}`,
						);
					}
				}

				const staticData = this.getWorkflowStaticData('node') as TriggerStaticData;
				delete staticData.signatureKeys;
				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const body = this.getBodyData() as IDataObject;
		const headers = this.getHeaderData() as IDataObject;
		const options = this.getNodeParameter('options', {}) as IDataObject;
		const verifySignature = options.verifySignature !== false;

		if (verifySignature) {
			const eventType = body.eventType as string | undefined;
			const staticData = this.getWorkflowStaticData('node') as TriggerStaticData;
			const signatureKey = eventType ? staticData.signatureKeys?.[eventType] : undefined;
			const received = (headers['x-ha-signature'] as string | undefined)?.toLowerCase();

			if (!signatureKey || !received) {
				this.getResponseObject().status(401).send();
				return { noWebhookResponse: true };
			}

			const request = this.getRequestObject() as unknown as { rawBody?: Buffer | string };
			const payload =
				request.rawBody !== undefined && request.rawBody !== null
					? request.rawBody
					: JSON.stringify(body);
			const expected = createHmac('sha256', signatureKey).update(payload).digest('hex');

			const expectedBuffer = Buffer.from(expected);
			const receivedBuffer = Buffer.from(received);
			const valid =
				expectedBuffer.length === receivedBuffer.length &&
				timingSafeEqual(expectedBuffer, receivedBuffer);

			if (!valid) {
				this.getResponseObject().status(401).send();
				return { noWebhookResponse: true };
			}
		}

		return {
			workflowData: [this.helpers.returnJsonArray([body])],
		};
	}
}
