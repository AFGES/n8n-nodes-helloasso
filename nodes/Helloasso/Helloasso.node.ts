import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { userDescription } from './resources/user';
import { companyDescription } from './resources/company';

export class Helloasso implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'HelloAsso',
		name: 'helloasso',
		icon: { light: 'file:helloasso.svg', dark: 'file:helloasso.dark.svg' },
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
						name: 'Company',
						value: 'company',
					},
					{
						name: 'User',
						value: 'user',
					},
				],
				default: 'user',
			},
			...userDescription,
			...companyDescription,
		],
	};
}
