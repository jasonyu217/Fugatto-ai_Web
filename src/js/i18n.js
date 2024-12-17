import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 初始化 i18next
async function initI18n() {
  await i18next
    .use(LanguageDetector)
    .init({
      fallbackLng: 'zh',
      debug: true,
      resources: {
        zh: {
          translation: await import('../i18n/translations/zh.js').then(m => m.default)
        },
        en: {
          translation: await import('../i18n/translations/en.js').then(m => m.default)
        }
      }
    });

  // 更新所有带有 data-i18n 属性的元素
  updateContent();

  // 监听语言变化
  i18next.on('languageChanged', () => {
    updateContent();
  });
}

// 更新页面内容
function updateContent() {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (element.tagName.toLowerCase() === 'select') {
      // 处理 select 元素内的所有 option
      Array.from(element.options).forEach(option => {
        const optionKey = option.getAttribute('data-i18n');
        if (optionKey) {
          option.textContent = i18next.t(optionKey);
        }
      });
    } else if (element.tagName.toLowerCase() === 'option') {
      // 单独处理 option 元素
      element.textContent = i18next.t(key);
    } else {
      // 处理其他元素
      element.textContent = i18next.t(key);
    }
  });
}

// 切换语言
function changeLanguage(lng) {
  i18next.changeLanguage(lng);
}

export { initI18n, changeLanguage }; 