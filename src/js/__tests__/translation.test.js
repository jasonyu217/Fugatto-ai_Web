import { describe, test, expect, beforeEach, jest } from '@jest/globals';
import i18next from 'i18next';
import { initI18n } from '../i18n';

describe('Translation Options Tests', () => {
  // 模拟 DOM 环境
  beforeEach(() => {
    document.body.innerHTML = `
      <select id="translateSelect">
        <option value="none" data-i18n="input.speechToText.translationOptions.none">不翻译</option>
      </select>
    `;
  });

  // 测试更新翻译选项函数
  test('updateTranslateOptions should correctly set options for Chinese source', () => {
    const translateSelect = document.getElementById('translateSelect');
    updateTranslateOptions('zh');
    
    expect(translateSelect.options.length).toBe(3);
    expect(translateSelect.options[0].value).toBe('none');
    expect(translateSelect.options[1].value).toBe('en');
    expect(translateSelect.options[2].value).toBe('ja');
  });

  // 测试选项文本是否正确翻译
  test('Options should display correct text based on current language', async () => {
    await initI18n();
    const translateSelect = document.getElementById('translateSelect');
    
    // 测试中文
    i18next.changeLanguage('zh');
    updateTranslateOptions('en');
    expect(translateSelect.options[0].textContent).toBe('不翻译');
    expect(translateSelect.options[1].textContent).toBe('翻译成中文');

    // 测试英文
    i18next.changeLanguage('en');
    updateTranslateOptions('zh');
    expect(translateSelect.options[0].textContent).toBe('No Translation');
    expect(translateSelect.options[1].textContent).toBe('Translate to English');
  });

  // 测试动态添加选项时的翻译
  test('addOptions should correctly set i18n attributes and translations', () => {
    const translateSelect = document.getElementById('translateSelect');
    const options = [
      { value: 'none', i18nKey: 'input.speechToText.translationOptions.none' },
      { value: 'en', i18nKey: 'input.speechToText.translationOptions.toEn' }
    ];

    addOptions(translateSelect, options);
    
    expect(translateSelect.options[0].getAttribute('data-i18n')).toBe('input.speechToText.translationOptions.none');
    expect(translateSelect.options[1].getAttribute('data-i18n')).toBe('input.speechToText.translationOptions.toEn');
  });
}); 