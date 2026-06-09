import type { INodeProperties } from 'n8n-workflow';
import { organizationSlugProperty } from '../shared/organizationSlug';
import { paginationProperties } from '../shared/pagination';

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
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many organizations',
				description: 'List organizations the authenticated partner can access',
				routing: {
					request: {
						method: 'GET',
						url: '/partners/me/organizations',
					},
					output: {
						postReceive: [{ type: 'rootProperty', properties: { property: 'data' } }],
					},
				},
			},
		],
		default: 'getAll',
	},
	organizationSlugProperty('organization', ['get']),
	...paginationProperties('organization', 'getAll'),
];
