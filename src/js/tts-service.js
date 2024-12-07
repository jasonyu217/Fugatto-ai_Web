import axios from 'axios';
import { config } from './config';
import { AppError } from './error-handler';

export class TTSService {
  constructor() {
    if (!config.elevenlabs.apiKey) {
      throw new AppError('API key is required', 'API_KEY_MISSING');
    }
    this.apiKey = config.elevenlabs.apiKey;
    this.apiUrl = config.elevenlabs.apiUrl;
  }

  async generateSpeech(text, voiceId = config.elevenlabs.defaultVoiceId) {
    if (!text?.trim()) {
      throw new AppError('Text is required', 'VALIDATION_ERROR');
    }

    try {
      const response = await axios({
        method: 'POST',
        url: `${this.apiUrl}/${voiceId}`,
        headers: {
          'Accept': 'audio/mpeg',
          'xi-api-key': this.apiKey,
          'Content-Type': 'application/json',
        },
        data: {
          text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5
          }
        },
        responseType: 'blob'
      });

      return URL.createObjectURL(response.data);
    } catch (error) {
      if (error.response) {
        throw new AppError(
          'Failed to generate speech',
          'API_ERROR',
          error.response.data
        );
      }
      throw error;
    }
  }
}