<template>
  <div class="relative flex h-[calc(100vh-4rem)]">
    <!-- 主内容区域 -->
    <div class="flex-1 p-6 pb-[72px] overflow-hidden">
      <!-- 标题和设置按钮 -->
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold text-white">Speech to Text</h1>
        <button 
          @click="showAdvancedSettings = true"
          class="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
        >
          <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
          </svg>
          <span>Advanced Settings</span>
        </button>
      </div>

      <!-- 上传/录音切换标签 -->
      <div class="flex gap-2 mb-6">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="currentTab = tab.id"
          class="flex-1 py-3 rounded-lg text-sm font-medium transition-all duration-200 border border-transparent"
          :class="currentTab === tab.id ? 'bg-teal-500/20 text-teal-500 border-teal-500/30' : 'bg-black/20 text-gray-400 hover:text-white hover:bg-white/5'"
        >
          {{ tab.name }}
        </button>
      </div>

      <!-- 内容区域 -->
      <div class="mb-6">
        <!-- 上传区域 -->
        <div 
          v-if="currentTab === 'upload'" 
          class="relative group border-2 border-dashed border-white/10 hover:border-teal-500/50 rounded-lg p-12 text-center transition-all duration-200 bg-black/20"
        >
          <div class="flex flex-col items-center gap-6">
            <div class="w-20 h-20 rounded-full bg-teal-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <svg class="w-10 h-10 text-teal-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
              </svg>
            </div>
            <div class="space-y-2 text-gray-400">
              <div class="text-sm">Format: MP3, WAV, OGG</div>
              <div class="text-sm">Size: Up to 10MB</div>
              <div class="text-sm">10-20 seconds of speaking is advisable.</div>
            </div>
          </div>
          <input type="file" class="absolute inset-0 opacity-0 cursor-pointer" accept=".mp3,.wav,.ogg" />
        </div>

        <!-- 录音区域 -->
        <div 
          v-else 
          class="border-2 border-dashed border-white/10 hover:border-teal-500/50 rounded-lg p-12 text-center transition-all duration-200 bg-black/20"
        >
          <div class="flex flex-col items-center gap-6">
            <button 
              class="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200"
              :class="isRecording ? 'bg-red-500/20 text-red-500' : 'bg-teal-500/20 text-teal-500 hover:scale-110'"
              @click="toggleRecording"
            >
              <svg class="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
                <path v-if="!isRecording" d="M12 15c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3z"/>
                <rect v-else x="7" y="7" width="10" height="10" rx="2"/>
              </svg>
            </button>
            <div class="text-sm text-gray-400">
              {{ isRecording ? 'Recording...' : 'Click to start recording' }}
            </div>
          </div>
        </div>
      </div>

      <!-- 功能选项 -->
      <div class="grid grid-cols-3 gap-4 mb-6">
        <!-- 语言选择 -->
        <div class="relative">
          <select class="w-full appearance-none bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white pr-10">
            <option>Auto-detect language</option>
            <option>English</option>
            <option>中文</option>
            <option>日本語</option>
          </select>
          <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg class="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </div>
        </div>

        <!-- 翻译选择 -->
        <div class="relative">
          <select class="w-full appearance-none bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white pr-10">
            <option>Translate to...</option>
            <option>English</option>
            <option>中文</option>
            <option>日本語</option>
          </select>
          <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg class="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </div>
        </div>

        <!-- 声音分离按钮 -->
        <button class="flex items-center justify-center gap-2 px-4 py-2.5 bg-black/20 border border-white/10 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 010-7.072m-2.828 9.9a9 9 0 010-12.728"/>
          </svg>
          <span>Voice Isolation</span>
        </button>
      </div>

      <!-- 开始转换按钮 -->
      <button 
        class="w-full py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-all duration-200 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        :disabled="isConverting"
        @click="startConversion"
      >
        <svg 
          v-if="isConverting"
          class="animate-spin h-5 w-5" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>{{ isConverting ? 'Converting...' : 'Start Conversion' }}</span>
      </button>
    </div>

    <!-- 右侧设置面板 -->
    <div 
      v-if="showAdvancedSettings"
      class="absolute right-0 top-0 bottom-0 w-80 bg-gray-900/95 backdrop-blur-md border-l border-white/10 p-6 transform transition-all duration-300"
      :class="showAdvancedSettings ? 'translate-x-0' : 'translate-x-full'"
    >
      <!-- 标题和关闭按钮 -->
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-black/20 flex items-center justify-center">
            <svg class="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
          </svg>
          </div>
          <h2 class="text-lg font-medium text-white">Settings</h2>
        </div>
        <button 
          @click="showAdvancedSettings = false"
          class="text-gray-400 hover:text-white transition-colors"
        >
          <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>

      <!-- 设置选项 -->
      <div class="space-y-8">
        <!-- 模型选择 -->
        <div class="space-y-4">
          <h3 class="text-base font-medium text-white">Model</h3>
          <div class="p-4 bg-black/20 rounded-lg border border-white/10 space-y-2">
            <div class="flex items-center justify-between">
              <span class="font-medium text-white">Eleven English v2</span>
              <svg class="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
              </svg>
            </div>
            <p class="text-sm text-gray-400">Our state-of-the-art speech to speech model suitable for scenarios where you need maximum control over the content and prosody of your generations.</p>
            <div class="inline-block px-3 py-1 bg-black/20 rounded-full text-sm text-gray-300">
              English
            </div>
          </div>
        </div>

        <!-- 稳定性滑块 -->
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <h3 class="text-base font-medium text-white">Stability</h3>
            <div class="flex justify-between text-sm text-gray-400">
              <span>More variable</span>
              <span class="ml-20">More stable</span>
            </div>
          </div>
          <input 
            type="range" 
            v-model="stability"
            class="w-full accent-teal-500"
            min="0"
            max="100"
          >
        </div>

        <!-- 相似度滑块 -->
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <h3 class="text-base font-medium text-white">Similarity</h3>
            <div class="flex justify-between text-sm text-gray-400">
              <span>Low</span>
              <span class="ml-20">High</span>
            </div>
          </div>
          <input 
            type="range" 
            v-model="similarity"
            class="w-full accent-teal-500"
            min="0"
            max="100"
          >
        </div>

        <!-- 风格夸张度滑块 -->
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <h3 class="text-base font-medium text-white">Style Exaggeration</h3>
            <div class="flex justify-between text-sm text-gray-400">
              <span>None</span>
              <span class="ml-20">Exaggerated</span>
            </div>
          </div>
          <input 
            type="range" 
            v-model="styleExaggeration"
            class="w-full accent-teal-500"
            min="0"
            max="100"
          >
        </div>

        <!-- 开关选项 -->
        <div class="space-y-4">
          <!-- 说话者增强 -->
          <div class="flex items-center justify-between">
            <span class="text-base font-medium text-white">Speaker boost</span>
            <button 
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200"
              :class="speakerBoost ? 'bg-teal-500' : 'bg-gray-600'"
              @click="speakerBoost = !speakerBoost"
            >
              <span 
                class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200"
                :class="speakerBoost ? 'translate-x-6' : 'translate-x-1'"
              />
            </button>
          </div>

          <!-- 移除背景噪音 -->
          <div class="flex items-center justify-between">
            <span class="text-base font-medium text-white">Remove Background Noise</span>
            <button 
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200"
              :class="removeNoise ? 'bg-teal-500' : 'bg-gray-600'"
              @click="removeNoise = !removeNoise"
            >
              <span 
                class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200"
                :class="removeNoise ? 'translate-x-6' : 'translate-x-1'"
              />
            </button>
          </div>
        </div>

        <!-- 重置按钮 -->
        <div class="pt-4">
          <button 
            @click="resetSettings"
            class="w-full py-2 bg-black/20 text-gray-300 hover:text-white border border-white/10 rounded-lg transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>

    <!-- 音频播放器 -->
    <AudioPlayer 
      v-if="audioUrl" 
      :src="audioUrl"
      class="absolute bottom-0 left-0 right-0"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AudioPlayer from './AudioPlayer.vue'

const tabs = [
  { id: 'upload', name: 'Upload an audio' },
  { id: 'record', name: 'Record your audio' }
]

const currentTab = ref('upload')
const isRecording = ref(false)
const isConverting = ref(false)
const showAdvancedSettings = ref(false)
const audioUrl = ref(null)

// 添加设置相关的响应式状态
const stability = ref(50)
const similarity = ref(85)
const styleExaggeration = ref(0)
const speakerBoost = ref(true)
const removeNoise = ref(false)

const toggleRecording = () => {
  isRecording.value = !isRecording.value
  // 实现录音逻辑
}

const startConversion = async () => {
  if (isConverting.value) return
  
  isConverting.value = true
  try {
    // 实现转换逻辑
    await new Promise(resolve => setTimeout(resolve, 2000))
    audioUrl.value = 'path/to/audio.mp3'
  } finally {
    isConverting.value = false
  }
}

// 重置设置
const resetSettings = () => {
  stability.value = 50
  similarity.value = 85
  styleExaggeration.value = 0
  speakerBoost.value = true
  removeNoise.value = false
}
</script>

<style scoped>
/* 使用与 TextToSpeech 组件相同的样式 */

/* 自定义滑块样式 */
input[type="range"] {
  @apply appearance-none bg-black/20 h-2 rounded-full;
}

input[type="range"]::-webkit-slider-thumb {
  @apply appearance-none w-4 h-4 bg-teal-500 rounded-full cursor-pointer hover:bg-teal-400 transition-colors;
}
</style> 