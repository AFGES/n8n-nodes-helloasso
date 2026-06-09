import type { INodeProperties } from 'n8n-workflow';
import { organizationSlugProperty } from '../shared/organizationSlug';
import { paginationProperties } from '../shared/pagination';
import { formStateOptions, formTypeOptions } from '../shared/enums';

export const formFields: INodeProperties[] = [
	organizationSlugProperty('form', ['getAll', 'getPublic']),
	{
		displayName: 'Form Type',
		name: 'formType',
		type: 'options',
		required: true,
		default: 'Event',
		options: formTypeOptions,
		displayOptions: { show: { resource: ['form'], operation: ['getPublic'] } },
		description: 'The type of the form',
	},
	{
		displayName: 'Form Slug',
		name: 'formSlug',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'my-event',
		displayOptions: { show: { resource: ['form'], operation: ['getPublic'] } },
		description: 'The form slug (its identifier in HelloAsso URLs)',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: { show: { resource: ['form'], operation: ['getAll'] } },
		options: [
			{
				displayName: 'Form Types',
				name: 'formTypes',
				type: 'multiOptions',
				default: [],
				options: formTypeOptions,
				description: 'Only return forms of these types',
				routing: { send: { type: 'query', property: 'formTypes' } },
			},
			{
				displayName: 'States',
				name: 'states',
				type: 'multiOptions',
				default: [],
				options: formStateOptions,
				description: 'Only return forms in these states',
				routing: { send: { type: 'query', property: 'states' } },
			},
		],
	},
	...paginationProperties('form', 'getAll'),
];
