import type { INodeProperties } from 'n8n-workflow';
import { orderFields } from './fields';

const showOnlyForOrders = {
	resource: ['order'],
};

export const orderDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForOrders },
		options: [
			{
				name: 'Cancel',
				value: 'cancel',
				action: 'Cancel an order',
				description: 'Cancel an order and its related payments',
				routing: {
					request: {
						method: 'POST',
						url: '=/orders/{{$parameter.orderId}}/cancel',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get an order',
				description: 'Get a single order by its ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/orders/{{$parameter.orderId}}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many orders',
				description: 'List the orders of an organization',
				routing: {
					request: {
						method: 'GET',
						url: '=/organizations/{{$parameter.organizationSlug}}/orders',
					},
					output: {
						postReceive: [{ type: 'rootProperty', properties: { property: 'data' } }],
					},
				},
			},
		],
		default: 'getAll',
	},
	...orderFields,
];
