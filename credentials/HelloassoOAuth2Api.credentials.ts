import type { ICredentialType, INodeProperties } from 'n8n-workflow';

export class HelloassoOAuth2Api implements ICredentialType {
	name = 'helloassoOAuth2Api';

	extends = ['oAuth2Api'];

	displayName = 'Afges Helloasso OAuth2 API';

	icon = { light: 'file:helloasso.svg', dark: 'file:helloasso.dark.svg' } as const;

	documentationUrl = 'https://dev.helloasso.com/docs/getting-started';

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
	];
}
