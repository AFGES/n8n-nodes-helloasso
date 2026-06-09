import type { INodeProperties } from 'n8n-workflow';
import { checkoutIntentFields } from './fields';

const showOnlyForCheckoutIntents = {
	resource: ['checkoutIntent'],
};

export const checkoutIntentDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForCheckoutIntents },
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a checkout intent',
				description: 'Initialize a checkout intent and get its payment redirect URL',
				routing: {
					request: {
						method: 'POST',
						url: '=/organizations/{{$parameter.organizationSlug}}/checkout-intents',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a checkout intent',
				description: 'Get a single checkout intent by its ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/organizations/{{$parameter.organizationSlug}}/checkout-intents/{{$parameter.checkoutIntentId}}',
					},
				},
			},
		],
		default: 'create',
	},
	...checkoutIntentFields,
];
