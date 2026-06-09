import type { INodeProperties } from 'n8n-workflow';

/**
 * Reusable required `Organization Slug` property. The slug is the organization
 * identifier used in HelloAsso URLs (e.g. `https://www.helloasso.com/associations/<slug>`).
 */
export function organizationSlugProperty(
	resource: string,
	operations: string[],
): INodeProperties {
	return {
		displayName: 'Organization Slug',
		name: 'organizationSlug',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'my-association',
		displayOptions: { show: { resource: [resource], operation: operations } },
		description: 'The organization slug (its identifier in HelloAsso URLs)',
	};
}
