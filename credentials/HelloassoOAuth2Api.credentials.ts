import type {
	IconFile,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class HelloassoOAuth2Api implements ICredentialType {
	name = 'helloassoOAuth2Api';

	extends = ['oAuth2Api'];

	displayName = 'HelloAsso OAuth2 API';

	icon = 'file:../../nodes/Helloasso/helloasso.svg' as IconFile;

	documentationUrl = 'https://dev.helloasso.com/docs/getting-started';

	httpRequestNode = {
		name: 'HelloAsso',
		docsUrl: 'https://dev.helloasso.com/docs/getting-started',
		apiBaseUrl: 'https://api.helloasso.com/v5/',
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.helloasso.com',
			url: '/v5/users/me/organizations',
			method: 'GET',
		},
	};

	properties: INodeProperties[] = [
		{
			displayName: 'Grant Type',
			name: 'grantType',
			type: 'hidden',
			default: 'clientCredentials',
		},
		{
			displayName: 'Access Token URL',
			name: 'accessTokenUrl',
			type: 'hidden',
			default: 'https://api.helloasso.com/oauth2/token',
		},
		{
			displayName: 'Auth URI Query Parameters',
			name: 'authQueryParameters',
			type: 'hidden',
			default: '',
		},
		{
			displayName: 'Authentication',
			name: 'authentication',
			type: 'hidden',
			default: 'body',
		},
		{
			displayName: 'Scope',
			name: 'scope',
			type: 'hidden',
			default: '',
		},
		{
			displayName: 'Send Additional Body Properties',
			name: 'sendAdditionalBodyProperties',
			type: 'hidden',
			default: false,
		},
		{
			displayName: 'Allowed HTTP Request Domains',
			name: 'allowedHttpRequestDomains',
			type: 'hidden',
			default: 'domains',
		},
		{
			displayName: 'Allowed Domains',
			name: 'allowedDomains',
			type: 'hidden',
			default: '*.helloasso.com',
		},
	];
}
