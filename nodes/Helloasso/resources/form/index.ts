import type { INodeProperties } from 'n8n-workflow';
import { formFields } from './fields';

const showOnlyForForms = {
	resource: ['form'],
};

export const formDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForForms },
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many forms',
				description: 'List the forms of an organization',
				routing: {
					request: {
						method: 'GET',
						url: '=/organizations/{{$parameter.organizationSlug}}/forms',
					},
					output: {
						postReceive: [{ type: 'rootProperty', properties: { property: 'data' } }],
					},
				},
			},
			{
				name: 'Get Public Data',
				value: 'getPublic',
				action: 'Get public form data',
				description: 'Get the public data of a single form',
				routing: {
					request: {
						method: 'GET',
						url: '=/organizations/{{$parameter.organizationSlug}}/forms/{{$parameter.formType}}/{{$parameter.formSlug}}/public',
					},
				},
			},
		],
		default: 'getAll',
	},
	...formFields,
];
