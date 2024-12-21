<template>
  <nav class="text-sm">
    <span class="text-gray-400">工作台</span>
    <span class="mx-2 text-gray-600">/</span>
    <span class="text-white">{{ currentPage }}</span>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const currentPage = computed(() => {
  const pathMap = {
    'text-to-speech': '文字转语音',
    'speech-to-text': '语音转文本',
    'speech-to-speech': '语音转语音',
    'voice-cloning': '语音克隆',
    'voice-library': '声音库',
    'history': '历史记录'
  }
  
  const path = route.path.split('/').pop()
  return pathMap[path] || '首页'
})
</script> 