import type { INodeProperties } from 'n8n-workflow';

/**
 * Builds the standard `Limit` / `Return All` property pair for a list operation.
 *
 * HelloAsso v5 list endpoints page with `pageIndex`/`pageSize` and expose a
 * `continuationToken` in the response. Some endpoints never report a total
 * count, so `continuationToken` is the only reliable cursor across all of them.
 */
export function paginationProperties(resource: string, operation: string): INodeProperties[] {
	const show = { resource: [resource], operation: [operation] };

	return [
		{
			displayName: 'Return All',
			name: 'returnAll',
			type: 'boolean',
			displayOptions: { show },
			default: false,
			description: 'Whether to return all results or only up to a given limit',
			routing: {
				send: { paginate: '={{ $value }}' },
				operations: {
					pagination: {
						type: 'generic',
						properties: {
							continue: '={{ !!$response.body.pagination.continuationToken }}',
							request: {
								qs: {
									continuationToken: '={{ $response.body.pagination.continuationToken }}',
								},
							},
						},
					},
				},
			},
		},
		{
			displayName: 'Limit',
			name: 'limit',
			type: 'number',
			displayOptions: { show: { ...show, returnAll: [false] } },
			typeOptions: { minValue: 1 },
			default: 50,
			routing: {
				send: { type: 'query', property: 'pageSize' },
				output: { maxResults: '={{ $value }}' },
			},
			description: 'Max number of results to return',
		},
	];
}
