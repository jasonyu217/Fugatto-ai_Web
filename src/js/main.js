import { supportedLanguages } from '../i18n';
import { i18nManager } from './i18n-manager';

// Set up language selector
const languageButton = document.getElementById('language-button');
const currentLanguage = document.getElementById('current-language');
const languageDropdown = document.getElementById('language-dropdown');

// Create language options
Object.entries(supportedLanguages).forEach(([code, name]) => {
  const option = document.createElement('button');
  option.className = 'w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors';
  option.textContent = name;
  option.dataset.lang = code;
  
  option.addEventListener('click', async () => {
    await i18nManager.changeLanguage(code);
    currentLanguage.textContent = name;
    languageDropdown.classList.add('hidden');
  });
  
  languageDropdown.appendChild(option);
});

// Update translations when language changes
function updateTranslations(translations) {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.dataset.i18n;
    const parts = key.split('.');
    let value = translations;
    for (const part of parts) {
      value = value?.[part];
    }
    if (value) element.textContent = value;
  });
  
  // Handle placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.dataset.i18nPlaceholder;
    const parts = key.split('.');
    let value = translations;
    for (const part of parts) {
      value = value?.[part];
    }
    if (value) element.placeholder = value;
  });
}

// Subscribe to language changes
i18nManager.subscribe(updateTranslations);

// Initialize with current language
i18nManager.getCurrentTranslations().then(translations => {
  currentLanguage.textContent = supportedLanguages[i18nManager.currentLang];
  updateTranslations(translations);
});

// Toggle dropdown with proper event parameter
languageButton.addEventListener('click', (event) => {
  // Prevent event bubbling
  event.stopPropagation();
  languageDropdown.classList.toggle('hidden');
  const icon = languageButton.querySelector('svg');
  icon.style.transform = languageDropdown.classList.contains('hidden') ? '' : 'rotate(180deg)';
});

// Close dropdown when clicking outside
document.addEventListener('click', (event) => {
  if (!languageButton.contains(event.target) && !languageDropdown.contains(event.target)) {
    languageDropdown.classList.add('hidden');
    const icon = languageButton.querySelector('svg');
    icon.style.transform = '';
  }
});