<template>
  <div class="relative flex h-[calc(100vh-4rem)]">
    <!-- 主内容区域 -->
    <div class="flex-1 p-6 pb-[72px] overflow-hidden">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold text-white">Text to Speech</h1>
        <div class="flex items-center gap-4">
          <div class="text-sm text-gray-400">
            {{ textLength }} / 20000
          </div>
          <button 
            class="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            @click="clearText"
          >
            <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
            <span>Clear Text</span>
          </button>
        </div>
      </div>

      <!-- 文本输入区域 -->
      <div class="relative h-[calc(100%-4rem)]">
        <textarea
          v-model="inputText"
          class="w-full h-full bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-white resize-none focus:outline-none focus:ring-2 focus:ring-teal-500/50 placeholder-gray-500"
          placeholder="Enter your text here..."
        ></textarea>

        <!-- 快速生成功能 - 内嵌在输入框内 -->
        <div v-show="!inputText" class="absolute left-0 right-0 bottom-4 px-4">
          <div class="space-y-2">
            <h3 class="text-base text-gray-400">Get started with</h3>
            <div class="flex flex-wrap gap-2">
              <button 
                v-for="template in templates" 
                :key="template.id"
                @click="useTemplate(template.id)"
                class="inline-flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-sm border border-white/10 rounded-full text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-sm whitespace-nowrap"
              >
                <component :is="template.icon" />
                <span>{{ template.name }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧设置面板 -->
    <div class="w-80 border-l border-white/10 bg-gray-900/50 backdrop-blur-md p-6 pb-[72px] overflow-hidden">
      <div class="h-full space-y-6">
        <h2 class="text-lg font-medium text-white flex items-center justify-between">
          Voice Settings
          <button class="text-gray-400 hover:text-white transition-colors">
            <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
            </svg>
          </button>
        </h2>

        <!-- 声音类型切换 -->
        <div class="flex rounded-lg bg-black/20 backdrop-blur-sm p-1">
          <button 
            class="flex-1 py-1.5 text-sm rounded-md transition-colors"
            :class="voiceType === 'standard' ? 'bg-teal-500/20 text-teal-500' : 'text-gray-400 hover:text-white'"
            @click="voiceType = 'standard'"
          >
            Standard Voice
          </button>
          <button 
            class="flex-1 py-1.5 text-sm rounded-md transition-colors"
            :class="voiceType === 'cloned' ? 'bg-teal-500/20 text-teal-500' : 'text-gray-400 hover:text-white'"
            @click="voiceType = 'cloned'"
          >
            Cloned Voice
          </button>
        </div>

        <!-- 语言选择 -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-400">Select language</label>
          <select class="w-full bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-2 text-white">
            <option>English (United States)</option>
            <option>中文 (简体)</option>
            <option>日本語</option>
          </select>
        </div>

        <!-- 声音选择 -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-400">Select voice</label>
          <select class="w-full bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-2 text-white">
            <option>Jenny (Female)</option>
            <option>Mike (Male)</option>
            <option>Emily (Female)</option>
          </select>
        </div>

        <!-- 语音参数调节 -->
        <div class="space-y-4">
          <!-- 语速 -->
          <div class="space-y-2">
            <div class="flex justify-between">
              <label class="block text-sm font-medium text-gray-400">Rate</label>
              <span class="text-sm text-gray-400">{{ rate }}%</span>
            </div>
            <input 
              type="range" 
              v-model="rate"
              class="w-full accent-teal-500"
              min="0"
              max="100"
            >
          </div>

          <!-- 音量 -->
          <div class="space-y-2">
            <div class="flex justify-between">
              <label class="block text-sm font-medium text-gray-400">Volume</label>
              <span class="text-sm text-gray-400">{{ volume }}%</span>
            </div>
            <input 
              type="range" 
              v-model="volume"
              class="w-full accent-teal-500"
              min="0"
              max="100"
            >
          </div>

          <!-- 音调 -->
          <div class="space-y-2">
            <div class="flex justify-between">
              <label class="block text-sm font-medium text-gray-400">Pitch</label>
              <span class="text-sm text-gray-400">{{ pitch }}%</span>
            </div>
            <input 
              type="range" 
              v-model="pitch"
              class="w-full accent-teal-500"
              min="0"
              max="100"
            >
          </div>
        </div>

        <!-- 生成按钮 -->
        <button 
          class="w-full py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="isGenerating"
          @click="generateSpeech"
        >
          <svg 
            v-if="isGenerating"
            class="animate-spin h-5 w-5" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>{{ isGenerating ? 'Generating...' : 'Generate Speech' }}</span>
        </button>
      </div>
    </div>

    <!-- 音频播放器 - 移到最外层 -->
    <AudioPlayer 
      v-if="audioUrl" 
      :src="audioUrl"
      class="absolute bottom-0 left-0 right-0"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AudioPlayer from './AudioPlayer.vue'

// 文本内容
const inputText = ref('')
const textLength = computed(() => inputText.value.length)

// 声音类型
const voiceType = ref('standard')

// 语音参数
const rate = ref(50)
const volume = ref(50)
const pitch = ref(50)

// 定义图标组件对象
const icons = {
  BookIcon: {
    template: `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    `
  },
  SmileIcon: {
    template: `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    `
  },
  MicrophoneIcon: {
    template: `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    `
  },
  GlobeIcon: {
    template: `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    `
  },
  MovieIcon: {
    template: `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
      </svg>
    `
  },
  GameIcon: {
    template: `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    `
  }
}

// 模板定义中的示例文本数组
const templateTexts = {
  story: [
    'Once upon a time in a magical forest, a young wizard discovered a mysterious glowing crystal...',
    'In a bustling city of the future, a brilliant inventor created a device that could read dreams...',
    'Deep beneath the ocean waves, a curious mermaid found an ancient map leading to a lost city...'
  ],
  joke: [
    'Why don\'t programmers like nature? It has too many bugs!',
    'What did the grape say when it got stepped on? Nothing, it just let out a little wine!',
    'Why did the scarecrow win an award? Because he was outstanding in his field!'
  ],
  ad: [
    'Introducing the revolutionary new SmartLife Hub - Your entire home at your fingertips!',
    'Experience luxury redefined with the all-new Aurora Collection.',
    'Meet the future of personal transportation - The EcoGlide X3000!'
  ],
  multilingual: [
    'Welcome! Bonjour! 你好! こんにちは! ¡Hola! Привет!',
    'Thank you! Merci! 谢谢! ありがとう! ¡Gracias! Спасибо!',
    'Good morning! Bon matin! 早上好! おはよう! ¡Buenos días! Доброе утро!'
  ],
  movie: [
    'No, I am your father. Search your feelings, you know it to be true.',
    'Here\'s looking at you, kid.',
    'May the Force be with you, always.'
  ],
  game: [
    'War... war never changes.',
    'It\'s dangerous to go alone! Take this.',
    'A hero need not speak. When he is gone, the world will speak for him.'
  ]
}

// 模板定义
const templates = [
  {
    id: 'story',
    name: 'Tell a story',
    icon: icons.BookIcon
  },
  {
    id: 'joke',
    name: 'Listen to a joke',
    icon: icons.SmileIcon
  },
  {
    id: 'ad',
    name: 'Narrate an ad',
    icon: icons.MicrophoneIcon
  },
  {
    id: 'multilingual',
    name: 'Hear multilingual speech',
    icon: icons.GlobeIcon
  },
  {
    id: 'movie',
    name: 'Play dramatic movie dialogue',
    icon: icons.MovieIcon
  },
  {
    id: 'game',
    name: 'Hear from a video game character',
    icon: icons.GameIcon
  }
]

// 使用模板 - 随机选择文本
const useTemplate = (templateId) => {
  const texts = templateTexts[templateId]
  if (texts) {
    const randomIndex = Math.floor(Math.random() * texts.length)
    inputText.value = texts[randomIndex]
  }
}

// 清除文本
const clearText = () => {
  inputText.value = ''
}

const isGenerating = ref(false)
const audioUrl = ref(null)

const generateSpeech = async () => {
  if (!inputText.value) return
  
  isGenerating.value = true
  try {
    // 这里添加实际的语音生成API调用
    await new Promise(resolve => setTimeout(resolve, 2000)) // 模拟API调用
    audioUrl.value = 'path/to/generated/audio.mp3' // 替换为实际的音频URL
  } catch (error) {
    console.error('Failed to generate speech:', error)
    // 添加错误提示
  } finally {
    isGenerating.value = false
  }
}
</script>

<style scoped>
/* 自定义滑块样式 */
input[type="range"] {
  @apply appearance-none bg-black/20 h-2 rounded-full;
}

input[type="range"]::-webkit-slider-thumb {
  @apply appearance-none w-4 h-4 bg-teal-500 rounded-full cursor-pointer hover:bg-teal-400 transition-colors;
}

/* 移除滚动条样式，因为我们不再需要滚动 */
textarea::-webkit-scrollbar {
  display: none;
}

textarea {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

/* 自定义选择框样式 */
select {
  @apply appearance-none bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
}

/* 添加淡入淡出效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 添加按钮悬浮效果 */
button {
  @apply transform transition-all duration-200;
}

button:hover {
  @apply -translate-y-0.5;
}
</style>