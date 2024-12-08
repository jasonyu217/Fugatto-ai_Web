import axios from 'axios';
import { config } from './config';
import { AppError } from './error-handler';

export class TTSService {
  constructor() {
    this.apiUrl = 'http://127.0.0.1:8002/api/tts';
  }

  async generateSpeech(text, language, voice) {
    if (!text?.trim()) {
      throw new Error('Text is required');
    }

    try {
      console.log('Sending TTS request:', { text, language, voice });
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const requestData = {
        text,
        language,
        voice
      };
      console.log('Request data:', requestData);

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'audio/mpeg'
        },
        body: JSON.stringify(requestData),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('TTS API Error:', response.status, errorText);
        try {
          const errorData = JSON.parse(errorText);
          throw new Error(errorData.error || `Failed to generate speech: ${response.status}`);
        } catch (e) {
          throw new Error(`Failed to generate speech: ${response.status}`);
        }
      }

      const blob = await response.blob();
      console.log('Received audio blob:', blob, 'size:', blob.size, 'type:', blob.type);
      
      if (blob.size === 0) {
        throw new Error('Received empty audio data');
      }

      return URL.createObjectURL(blob);
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error('Request timed out');
        throw new Error('Request timed out, please try again');
      }
      console.error('TTS Error:', error);
      throw error;
    }
  }
}