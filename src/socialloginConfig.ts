import {
    AuthServiceConfig,
    FacebookLoginProvider
} from 'angular5-social-login';

export function getAuthServiceConfigs() {
    const config = new AuthServiceConfig([
        {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('{FACEBOOK_APP_ID_HERE}')
        }
    ]);
    return config;
}
