// 导入样式
import '../css/styles.css';
import i18next from './i18n-config.js';

// 更新所有带有 data-i18n 属性的元素文本
function updateContent() {
  console.log('Updating content with language:', i18next.language);
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = i18next.t(key);
    console.log('Translating key:', key, 'to:', translation);
    if (translation) {
      element.textContent = translation;
    } else {
      console.warn('Missing translation for key:', key);
    }
  });

  // 更新占位符文本
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    const translation = i18next.t(key);
    if (translation) {
      element.placeholder = translation;
    } else {
      console.warn('Missing placeholder translation for key:', key);
    }
  });
}

// 初始化语言下拉菜单
function initLanguageDropdown() {
  const languageButton = document.getElementById('language-button');
  const languageDropdown = document.getElementById('language-dropdown');
  const currentLanguageSpan = document.getElementById('current-language');

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'zh', name: '中文' },
    { code: 'ja', name: '日本語' },
    { code: 'es', name: 'Español' },
    { code: 'ru', name: 'Русский' },
    { code: 'ar', name: 'العربية' }
  ];

  languages.forEach(lang => {
    const option = document.createElement('button');
    option.className = 'w-full text-left px-4 py-2 hover:bg-white/10 transition-colors';
    option.textContent = lang.name;
    option.onclick = () => {
      console.log('Changing language to:', lang.code);
      i18next.changeLanguage(lang.code).then(() => {
        console.log('Language changed, new translations:', i18next.t('pricing.title'));
        currentLanguageSpan.textContent = lang.name;
        languageDropdown.classList.add('hidden');
        updateContent();
      }).catch(error => {
        console.error('Error changing language:', error);
      });
    };
    languageDropdown.appendChild(option);
  });

  // 切换下拉菜单显示/隐藏
  languageButton.addEventListener('click', () => {
    languageDropdown.classList.toggle('hidden');
  });

  // 点击其他地方时关闭下拉菜单
  document.addEventListener('click', (e) => {
    if (!languageButton.contains(e.target) && !languageDropdown.contains(e.target)) {
      languageDropdown.classList.add('hidden');
    }
  });

  // 设置初始语言显示
  currentLanguageSpan.textContent = languages.find(lang => 
    lang.code === i18next.language
  )?.name || 'English';
}

// Tab 切换功能
function initTabs() {
  const tabs = document.querySelectorAll('.tab-button');
  const views = document.querySelectorAll('.input-output-container');
  
  // 添加调试日志
  console.log('Found tabs:', tabs.length);
  console.log('Found views:', views.length);
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      console.log('Tab clicked:', tab.dataset.tab); // 调试日志
      
      // 移除所有 active 类和显示
      tabs.forEach(t => t.classList.remove('active'));
      views.forEach(v => {
        console.log('Hiding view:', v.id); // 调试日志
        v.classList.add('hidden');
      });
      
      // 添加 active 类到当前 tab
      tab.classList.add('active');
      
      // 显示对应的视图
      const viewId = `${tab.dataset.tab}-view`;
      const targetView = document.getElementById(viewId);
      console.log('Showing view:', viewId); // 调试日志
      
      if (targetView) {
        targetView.classList.remove('hidden');
      } else {
        console.error('View not found:', viewId);
      }
    });
  });
}

// 添加视频播放功能
function initVideoPlayer() {
  const videoOverlay = document.getElementById('video-overlay');
  const promoVideo = document.getElementById('promo-video');
  const videoUrl = "/Audio AI Fugatto Generates Sound from Text _ NVIDIA Research - NVIDIA Developer (1080p, h264, youtube).mp4";

  if (videoOverlay && promoVideo) {
    videoOverlay.addEventListener('click', () => {
      // 设置视频源并自动播放
      promoVideo.src = videoUrl;
      promoVideo.autoplay = true;
      videoOverlay.style.display = 'none';
    });
  }
}

// 初始化语音选择器
function initVoiceSelector() {
  const languageSelect = document.getElementById('languageSelect');
  const voiceSelect = document.getElementById('voiceSelect');

  // 根据选择的语言更新可用的声音选项
  languageSelect.addEventListener('change', (e) => {
    const selectedLanguage = e.target.value;
    updateAvailableVoices(selectedLanguage);
  });

  // 更新声音选项的函数
  function updateAvailableVoices(language) {
    const voices = getVoicesForLanguage(language);
    voiceSelect.innerHTML = '';
    voices.forEach(voice => {
      const option = document.createElement('option');
      option.value = voice.id;
      option.textContent = i18next.t(`input.textToSpeech.voices.${voice.id}`);
      voiceSelect.appendChild(option);
    });
  }

  // 获取特定语言可用的声音
  function getVoicesForLanguage(language) {
    // 这里可以根据实际的 API 和需求来定义每种语言可用的声音
    const voiceMap = {
      'en-US': [
        { id: 'energetic-male', name: 'Energetic Male' },
        { id: 'professional-female', name: 'Professional Female' },
        { id: 'friendly-male', name: 'Friendly Male' },
        { id: 'warm-female', name: 'Warm Female' },
        { id: 'news-anchor', name: 'News Anchor' },
        { id: 'storyteller', name: 'Storyteller' }
      ],
      'zh-CN': [
        { id: 'energetic-male', name: '活力男声' },
        { id: 'professional-female', name: '专业女声' },
        { id: 'friendly-male', name: '亲和男声' },
        { id: 'warm-female', name: '温暖女声' },
        { id: 'news-anchor', name: '新闻播报' },
        { id: 'storyteller', name: '故事讲述' }
      ]
      // ... 其他语言的声音配置
    };
    return voiceMap[language] || voiceMap['en-US'];
  }

  // 初始化默认语言的声音选项
  updateAvailableVoices(languageSelect.value);
}

// 在 DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  initLanguageDropdown();
  initTabs();
  initVideoPlayer();
  updateContent();
  initVoiceSelector();
});

// 监听语言变化
i18next.on('languageChanged', (lng) => {
  console.log('Language changed to:', lng);
  updateContent();
});

// FAQ 交互
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;
    answer.classList.toggle('hidden');
  });
});

if (import.meta.hot) {
  import.meta.hot.accept()
}