import { Auth0Client } from '@auth0/auth0-spa-js';

const auth0 = new Auth0Client({
  domain: 'your-auth0-domain.auth0.com',
  client_id: 'your-client-id',
  redirect_uri: window.location.origin
});

export const login = async () => {
  await auth0.loginWithRedirect({
    authorizationParams: {
      connection: 'google-oauth2'
    }
  });
};

export const handleCallback = async () => {
  try {
    await auth0.handleRedirectCallback();
    const user = await auth0.getUser();
    return user;
  } catch (error) {
    console.error('Error handling callback:', error);
    return null;
  }
};