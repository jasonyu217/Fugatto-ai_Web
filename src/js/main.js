import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { login, handleCallback } from './auth.js';
import { TTSService } from './tts-service.js';
import { AudioPlayer } from './audio-player.js';
import { validateConfig } from './config.js';
import { handleError } from './error-handler.js';
import en from '../i18n/translations/en.js';
import zh from '../i18n/translations/zh.js';

// Initialize i18next
i18next
  .use(LanguageDetector)
  .init({
    resources: {
      en: { translation: en },
      zh: { translation: zh }
    },
    fallbackLng: 'en',
    detection: {
      order: ['navigator', 'querystring', 'cookie', 'localStorage', 'sessionStorage', 'htmlTag'],
    }
  });

let ttsService;
const audioPlayer = new AudioPlayer(document.getElementById('audioPlayer'));
const generateButton = document.getElementById('generateButton');
const textInput = document.getElementById('textInput');
const audioStatus = document.getElementById('audioStatus');

// Initialize services
try {
  validateConfig();
  ttsService = new TTSService();
} catch (error) {
  handleError(error, audioStatus);
  generateButton.disabled = true;
}

generateButton.addEventListener('click', async () => {
  const text = textInput.value.trim();
  if (!text) {
    audioStatus.textContent = i18next.t('errors.noText');
    return;
  }

  try {
    generateButton.disabled = true;
    audioStatus.textContent = i18next.t('status.generating');
    
    const audioUrl = await ttsService.generateSpeech(text);
    audioPlayer.setAudioSource(audioUrl);
    audioStatus.textContent = i18next.t('status.success');
    audioPlayer.play();
  } catch (error) {
    handleError(error, audioStatus);
  } finally {
    generateButton.disabled = false;
  }
});

// Update content based on selected language
function updateContent() {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    element.textContent = i18next.t(key);
  });
  
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    element.placeholder = i18next.t(key);
  });
}

// Language selector
const languageSelector = document.querySelector('#language-selector select');
languageSelector.addEventListener('change', (event) => {
  i18next.changeLanguage(event.target.value).then(updateContent);
});

// Auth setup
const loginButton = document.querySelector('#login-button');
loginButton.addEventListener('click', login);

// Handle authentication callback
if (window.location.search.includes('code=')) {
  handleCallback().then(user => {
    if (user) {
      loginButton.textContent = 'Logout';
    }
  });
}

// Initial content update
updateContent();

// Tab functionality
const tabButtons = document.querySelectorAll('.tab-button');
const inputAreas = document.querySelectorAll('.input-area');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    tabButtons.forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    button.classList.add('active');
  });
});

// FAQ functionality
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;
    const icon = question.querySelector('svg');
    
    // Toggle answer visibility
    answer.classList.toggle('hidden');
    
    // Rotate icon
    icon.style.transform = answer.classList.contains('hidden') ? '' : 'rotate(180deg)';
  });
});

// Video player functionality
const videoOverlay = document.getElementById('video-overlay');
const playButton = videoOverlay?.querySelector('.play-button');
let youtubePlayer = null;
let isYouTubeAPIReady = false;

// Load YouTube API
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

window.onYouTubeIframeAPIReady = function() {
  youtubePlayer = new YT.Player('promo-video', {
    videoId: 'qj1Sp8He6e4',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
};

function onPlayerReady(event) {
  isYouTubeAPIReady = true;
  youtubePlayer = event.target;
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED || event.data === YT.PlayerState.PAUSED) {
    videoOverlay.style.display = 'flex';
    videoOverlay.classList.remove('opacity-0');
  } else if (event.data === YT.PlayerState.PLAYING) {
    videoOverlay.classList.add('opacity-0');
    setTimeout(() => {
      videoOverlay.style.display = 'none';
    }, 300);
  }
}

if (videoOverlay && playButton) {
  playButton.addEventListener('click', () => {
    if (youtubePlayer && isYouTubeAPIReady) {
      youtubePlayer.playVideo();
    } else {
      console.warn('YouTube player not ready yet');
    }
  });
}

// Set initial language based on detection
const detectedLanguage = i18next.language;
languageSelector.value = detectedLanguage;