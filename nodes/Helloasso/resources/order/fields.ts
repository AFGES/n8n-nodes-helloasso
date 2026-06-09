import type { INodeProperties } from 'n8n-workflow';
import { organizationSlugProperty } from '../shared/organizationSlug';
import { paginationProperties } from '../shared/pagination';
import { formTypeOptions } from '../shared/enums';

export const orderFields: INodeProperties[] = [
	{
		displayName: 'Order ID',
		name: 'orderId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['order'], operation: ['get', 'cancel'] } },
		description: 'The ID of the order',
	},
	organizationSlugProperty('order', ['getAll']),
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: { show: { resource: ['order'], operation: ['getAll'] } },
		options: [
			{
				displayName: 'Form Types',
				name: 'formTypes',
				type: 'multiOptions',
				default: [],
				options: formTypeOptions,
				description: 'Only return orders from forms of these types',
				routing: { send: { type: 'query', property: 'formTypes' } },
			},
			{
				displayName: 'From Date',
				name: 'from',
				type: 'dateTime',
				default: '',
				description: 'Only return orders created on or after this date',
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
				displayName: 'To Date',
				name: 'to',
				type: 'dateTime',
				default: '',
				description: 'Only return orders created before this date (exclusive)',
				routing: { send: { type: 'query', property: 'to' } },
			},
			{
				displayName: 'With Details',
				name: 'withDetails',
				type: 'boolean',
				default: false,
				description: 'Whether to include custom fields in the response',
				routing: { send: { type: 'query', property: 'withDetails' } },
			},
		],
	},
	...paginationProperties('order', 'getAll'),
];
