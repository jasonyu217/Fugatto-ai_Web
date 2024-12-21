<template>
  <div 
    class="bg-gray-900/50 backdrop-blur-md border-r border-white/10"
    :class="{ 'w-64': !isCollapsed, 'w-20': isCollapsed }"
  >
    <div class="p-4 border-b border-white/10">
      <div class="flex items-center gap-2">
        <span class="text-xl font-bold text-white" v-if="!isCollapsed">Fugatto AI</span>
        <svg class="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.3,0.7c-0.4-0.4-1-0.4-1.4,0l-9.6,9.6c-0.4,0.4-0.4,1,0,1.4l9.6,9.6c0.4,0.4,1,0.4,1.4,0l9.6-9.6 c0.4-0.4,0.4-1,0-1.4L11.3,0.7z"/>
        </svg>
      </div>
    </div>
    
    <nav class="p-4 space-y-6">
      <div v-for="(section, index) in menuSections" :key="index">
        <div class="text-sm font-medium text-gray-400 mb-2" v-if="!isCollapsed">
          {{ section.title }}
        </div>
        <div class="space-y-1">
          <router-link
            v-for="item in section.items"
            :key="item.path"
            :to="item.path"
            class="flex items-center px-3 py-2 text-gray-300 rounded-lg hover:bg-white/5 transition-colors"
            :class="{ 'justify-center': isCollapsed }"
          >
            <component 
              :is="item.icon" 
              class="w-5 h-5" 
              :class="{ 'mr-3': !isCollapsed }"
            />
            <span v-if="!isCollapsed">{{ item.title }}</span>
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import TextToSpeechIcon from '../icons/TextToSpeechIcon.vue'
import SpeechToTextIcon from '../icons/SpeechToTextIcon.vue'
import SpeechToSpeechIcon from '../icons/SpeechToSpeechIcon.vue'
import VoiceCloningIcon from '../icons/VoiceCloningIcon.vue'
import VoiceLibraryIcon from '../icons/VoiceLibraryIcon.vue'
import HistoryIcon from '../icons/HistoryIcon.vue'

const props = defineProps({
  isCollapsed: {
    type: Boolean,
    default: false
  }
})

const route = useRoute()

const menuSections = [
  {
    title: '创建',
    items: [
      {
        title: '文字转语音',
        path: '/workspace/text-to-speech',
        icon: TextToSpeechIcon
      },
      {
        title: '语音转文本',
        path: '/workspace/speech-to-text',
        icon: SpeechToTextIcon
      },
      {
        title: '语音转语音',
        path: '/workspace/speech-to-speech',
        icon: SpeechToSpeechIcon
      },
      {
        title: '语音克隆',
        path: '/workspace/voice-cloning',
        icon: VoiceCloningIcon
      }
    ]
  },
  {
    title: '工具',
    items: [
      {
        title: '声音库',
        path: '/workspace/voice-library',
        icon: VoiceLibraryIcon
      },
      {
        title: '历史记录',
        path: '/workspace/history',
        icon: HistoryIcon
      }
    ]
  }
]

const isActive = (path) => route.path === path
</script> 