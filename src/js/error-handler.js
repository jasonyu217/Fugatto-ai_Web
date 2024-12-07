export class AppError extends Error {
  constructor(message, type = 'GENERIC_ERROR', details = null) {
    super(message);
    this.type = type;
    this.details = details;
    this.name = 'AppError';
  }
}

export function handleError(error, audioStatus) {
  console.error('Error:', error);

  if (error instanceof AppError) {
    switch (error.type) {
      case 'API_KEY_MISSING':
        audioStatus.textContent = 'API key not configured. Please contact support.';
        break;
      case 'API_ERROR':
        audioStatus.textContent = 'Service temporarily unavailable. Please try again later.';
        break;
      default:
        audioStatus.textContent = error.message;
    }
  } else if (error.response) {
    // Axios HTTP error
    switch (error.response.status) {
      case 401:
        audioStatus.textContent = 'Authentication failed. Please check API key.';
        break;
      case 429:
        audioStatus.textContent = 'Rate limit exceeded. Please try again later.';
        break;
      default:
        audioStatus.textContent = 'An error occurred. Please try again.';
    }
  } else {
    audioStatus.textContent = 'An unexpected error occurred. Please try again.';
  }
}