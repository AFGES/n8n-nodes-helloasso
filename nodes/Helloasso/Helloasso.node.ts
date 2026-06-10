import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { organizationDescription } from './resources/organization';
import { formDescription } from './resources/form';
import { orderDescription } from './resources/order';
import { paymentDescription } from './resources/payment';
import { itemDescription } from './resources/item';
import { checkoutIntentDescription } from './resources/checkoutIntent';

export class Helloasso implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'HelloAsso',
		name: 'helloasso',
		icon: 'file:helloasso.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the HelloAsso API',
		defaults: {
			name: 'Helloasso',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'helloassoOAuth2Api', required: true }],
		requestDefaults: {
			baseURL: 'https://api.helloasso.com/v5/',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Checkout Intent',
						value: 'checkoutIntent',
					},
					{
						name: 'Form',
						value: 'form',
					},
					{
						name: 'Item',
						value: 'item',
					},
					{
						name: 'Order',
						value: 'order',
					},
					{
						name: 'Organization',
						value: 'organization',
					},
					{
						name: 'Payment',
						value: 'payment',
					},
				],
				default: 'organization',
			},
			...organizationDescription,
			...formDescription,
			...orderDescription,
			...paymentDescription,
			...itemDescription,
			...checkoutIntentDescription,
		],
	};
}
