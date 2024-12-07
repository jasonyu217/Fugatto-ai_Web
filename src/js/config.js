export const config = {
  elevenlabs: {
    apiKey: import.meta.env.VITE_ELEVENLABS_API_KEY || '',
    defaultVoiceId: '21m00Tcm4TlvDq8ikWAM',
    apiUrl: 'https://api.elevenlabs.io/v1/text-to-speech'
  },
  auth0: {
    domain: import.meta.env.VITE_AUTH0_DOMAIN || '',
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID || '',
    redirectUri: window.location.origin
  }
};

export function validateConfig() {
  const missingVars = [];
  
  if (!config.elevenlabs.apiKey) {
    missingVars.push('VITE_ELEVENLABS_API_KEY');
  }
  if (!config.auth0.domain) {
    missingVars.push('VITE_AUTH0_DOMAIN');
  }
  if (!config.auth0.clientId) {
    missingVars.push('VITE_AUTH0_CLIENT_ID');
  }

  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
}