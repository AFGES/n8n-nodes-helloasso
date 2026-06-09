import type { INodeProperties } from 'n8n-workflow';
import { paymentFields } from './fields';

const showOnlyForPayments = {
	resource: ['payment'],
};

export const paymentDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForPayments },
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get a payment',
				description: 'Get a single payment by its ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/payments/{{$parameter.paymentId}}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many payments',
				description: 'List the payments of an organization',
				routing: {
					request: {
						method: 'GET',
						url: '=/organizations/{{$parameter.organizationSlug}}/payments',
					},
					output: {
						postReceive: [{ type: 'rootProperty', properties: { property: 'data' } }],
					},
				},
			},
			{
				name: 'Refund',
				value: 'refund',
				action: 'Refund a payment',
				description: 'Refund a payment, fully or partially',
				routing: {
					request: {
						method: 'POST',
						url: '=/payments/{{$parameter.paymentId}}/refund',
					},
				},
			},
		],
		default: 'getAll',
	},
	...paymentFields,
];
