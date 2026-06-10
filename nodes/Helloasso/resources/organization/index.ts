import type { INodeProperties } from 'n8n-workflow';
import { organizationSlugProperty } from '../shared/organizationSlug';

const showOnlyForOrganizations = {
	resource: ['organization'],
};

export const organizationDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForOrganizations },
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get an organization',
				description: 'Get a single organization by its slug',
				routing: {
					request: {
						method: 'GET',
						url: '=/organizations/{{$parameter.organizationSlug}}',
					},
				},
			},
		],
		default: 'get',
	},
	organizationSlugProperty('organization', ['get']),
];
