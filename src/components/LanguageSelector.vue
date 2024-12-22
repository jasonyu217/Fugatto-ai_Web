<template>
  <select 
    class="bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white"
    v-model="currentLanguage"
    @change="handleLanguageChange"
  >
    <option v-for="lang in languages" :key="lang.code" :value="lang.code">
      {{ lang.name }}
    </option>
  </select>
</template>

<script setup>
import { ref } from 'vue'

const languages = [
  { code: 'zh', name: '中文' },
  { code: 'en', name: 'English' },
  { code: 'ja', name: '日本語' },
  { code: 'es', name: 'Español' },
  { code: 'ru', name: 'Русский' },
  { code: 'ar', name: 'العربية' }
]

const currentLanguage = ref('zh')

const handleLanguageChange = (event) => {
  // 处理语言切换逻辑
  // 后续会集成i18n
}
</script> 