import type { INodeProperties } from 'n8n-workflow';
import { organizationSlugProperty } from '../shared/organizationSlug';
import { paginationProperties } from '../shared/pagination';
import { paymentStateOptions } from '../shared/enums';

export const paymentFields: INodeProperties[] = [
	{
		displayName: 'Payment ID',
		name: 'paymentId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['payment'], operation: ['get', 'refund'] } },
		description: 'The ID of the payment',
	},
	organizationSlugProperty('payment', ['getAll']),
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: { show: { resource: ['payment'], operation: ['getAll'] } },
		options: [
			{
				displayName: 'From Date',
				name: 'from',
				type: 'dateTime',
				default: '',
				description: 'Only return payments created on or after this date',
				routing: { send: { type: 'query', property: 'from' } },
			},
			{
				displayName: 'Search',
				name: 'userSearchKey',
				type: 'string',
				default: '',
				description: 'Filter on payer or user first name, last name or email',
				routing: { send: { type: 'query', property: 'userSearchKey' } },
			},
			{
				displayName: 'States',
				name: 'states',
				type: 'multiOptions',
				default: [],
				options: paymentStateOptions,
				description: 'Only return payments in these states',
				routing: { send: { type: 'query', property: 'states' } },
			},
			{
				displayName: 'To Date',
				name: 'to',
				type: 'dateTime',
				default: '',
				description: 'Only return payments created before this date (exclusive)',
				routing: { send: { type: 'query', property: 'to' } },
			},
		],
	},
	{
		displayName: 'Comment',
		name: 'comment',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: ['payment'], operation: ['refund'] } },
		description: 'Optional comment explaining the refund',
		routing: { send: { type: 'body', property: 'comment' } },
	},
	{
		displayName: 'Cancel Order',
		name: 'cancelOrder',
		type: 'boolean',
		default: false,
		displayOptions: { show: { resource: ['payment'], operation: ['refund'] } },
		description: 'Whether to also cancel the order linked to the payment',
		routing: { send: { type: 'body', property: 'cancelOrder' } },
	},
	{
		displayName: 'Send Refund Email',
		name: 'sendRefundMail',
		type: 'boolean',
		default: true,
		displayOptions: { show: { resource: ['payment'], operation: ['refund'] } },
		description: 'Whether to notify the payer by email about the refund',
		routing: { send: { type: 'body', property: 'sendRefundMail' } },
	},
	...paginationProperties('payment', 'getAll'),
];
