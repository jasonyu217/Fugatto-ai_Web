<template>
  <div class="relative">
    <button 
      @click="isOpen = !isOpen"
      class="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
    >
      <img :src="currentLanguage.flag" :alt="currentLanguage.name" class="w-5 h-5 rounded-sm object-cover">
      <span>{{ currentLanguage.name }}</span>
      <svg 
        class="w-4 h-4 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </button>

    <div 
      v-if="isOpen"
      class="absolute right-0 mt-2 w-48 bg-gray-900/90 backdrop-blur-md rounded-lg shadow-lg border border-white/10"
    >
      <div class="py-1">
        <button
          v-for="lang in languages"
          :key="lang.code"
          @click="selectLanguage(lang)"
          class="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-300 hover:bg-white/10"
        >
          <img :src="lang.flag" :alt="lang.name" class="w-5 h-5 rounded-sm object-cover">
          <span>{{ lang.name }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isOpen = ref(false)

const languages = [
  { code: 'zh', name: '中文', flag: '/flags/zh.svg' },
  { code: 'en', name: 'English', flag: '/flags/en.svg' },
  { code: 'ja', name: '日本語', flag: '/flags/ja.svg' }
]

const currentLanguage = ref(languages[0])

const selectLanguage = (lang) => {
  currentLanguage.value = lang
  isOpen.value = false
  // TODO: 实现语言切换逻辑
}

// 点击外部关闭下拉菜单
const closeOnClickOutside = (e) => {
  if (!e.target.closest('.relative')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeOnClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', closeOnClickOutside)
})
</script> 