import type { INodeProperties } from 'n8n-workflow';
import { itemFields } from './fields';

const showOnlyForItems = {
	resource: ['item'],
};

export const itemDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForItems },
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get an item',
				description: 'Get a single order item by its ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/items/{{$parameter.itemId}}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many items',
				description: 'List the order items of an organization',
				routing: {
					request: {
						method: 'GET',
						url: '=/organizations/{{$parameter.organizationSlug}}/items',
					},
					output: {
						postReceive: [{ type: 'rootProperty', properties: { property: 'data' } }],
					},
				},
			},
		],
		default: 'getAll',
	},
	...itemFields,
];
