import type { INodeProperties } from 'n8n-workflow';
import { organizationSlugProperty } from '../shared/organizationSlug';
import { paginationProperties } from '../shared/pagination';

export const itemFields: INodeProperties[] = [
	{
		displayName: 'Item ID',
		name: 'itemId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['item'], operation: ['get'] } },
		description: 'The ID of the item',
	},
	organizationSlugProperty('item', ['getAll']),
	...paginationProperties('item', 'getAll'),
];
