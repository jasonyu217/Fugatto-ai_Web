<template>
  <div class="relative flex h-[calc(100vh-4rem)]">
    <!-- 主内容区域 -->
    <div class="flex-1 p-6 pb-[72px] overflow-hidden">
      <!-- 标题区域 -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-white mb-2">Clone voice with AI</h1>
        <p class="text-gray-400">Clone Voice with AI, create a voice with exact tone, timber and emotion!</p>
      </div>

      <!-- 主要内容区域 - 使用网格布局 -->
      <div class="grid grid-cols-2 gap-8">
        <!-- 左侧上传区域 -->
        <div class="relative group border-2 border-dashed border-white/10 hover:border-teal-500/50 rounded-lg p-12 text-center transition-all duration-200 bg-black/20">
          <div class="flex flex-col items-center gap-6">
            <div class="w-20 h-20 rounded-full bg-teal-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <svg class="w-10 h-10 text-teal-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
              </svg>
            </div>
            <div class="space-y-2 text-gray-400">
              <div class="text-base">Drop or Upload</div>
              <div class="text-sm">Upload minimum 30 second of high quality audio. (Supports: .mp3, .mp4, .mov)</div>
            </div>
          </div>
          <input type="file" class="absolute inset-0 opacity-0 cursor-pointer" accept=".mp3,.mp4,.mov" />
        </div>

        <!-- 右侧设置选项 -->
        <div class="space-y-4">
          <!-- 语言选择 -->
          <div class="space-y-2">
            <label class="flex items-center gap-2 text-white">
              <span>Language</span>
              <span class="text-sm text-gray-400">(23 Available Languages)</span>
            </label>
            <select class="w-full appearance-none bg-[#F5F3FF]/10 border border-white/10 rounded-lg px-4 py-3 text-white">
              <option>English</option>
              <option>中文</option>
              <option>日本語</option>
            </select>
          </div>

          <!-- 情感选择 -->
          <div class="space-y-2">
            <label class="text-white">Emotion</label>
            <select class="w-full appearance-none bg-[#F5F3FF]/10 border border-white/10 rounded-lg px-4 py-3 text-white">
              <option>General</option>
              <option>Happy</option>
              <option>Sad</option>
              <option>Angry</option>
            </select>
          </div>

          <!-- 声音命名 -->
          <div class="space-y-2">
            <label class="text-white">Voice Name</label>
            <div class="relative">
              <input 
                type="text" 
                class="w-full bg-[#F5F3FF]/10 border border-white/10 rounded-lg px-4 py-3 text-white"
                placeholder="Enter a name for your voice"
                v-model="voiceName"
                maxlength="20"
              >
              <span class="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                {{ voiceName.length }}/20
              </span>
            </div>
          </div>

          <!-- 示例句子 -->
          <div class="space-y-2">
            <label class="text-white">Sample Sentence (optional)</label>
            <textarea 
              class="w-full h-[84px] bg-[#F5F3FF]/10 border border-white/10 rounded-lg px-4 py-3 text-white resize-none"
              placeholder="Always bear in mind that your own resolution to success is more important than any other one thing."
            ></textarea>
          </div>
        </div>
      </div>

      <!-- 底部协议和按钮区域 -->
      <div class="mt-8 space-y-6">
        <!-- 用户协议 -->
        <div class="space-y-4">
          <label class="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" class="mt-1" v-model="agreement">
            <span class="text-sm text-gray-300">
              I also confirm that I have the rights to the audio files used in cloning this voice, and I will not use this or any other voice on Wavel to generate any sexual, hateful, abusive, illegal, fraudulent, or deceitful content whatsoever.
            </span>
          </label>
          <div class="text-sm text-gray-300">
            I fully understand and agree to Wavel 
            <a href="#" class="text-teal-500 hover:text-teal-400">Terms of Use</a> 
            and 
            <a href="#" class="text-teal-500 hover:text-teal-400">Privacy Policy</a>.
          </div>
        </div>

        <!-- 创建按钮 -->
        <button 
          class="w-full py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-all duration-200 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          :disabled="!agreement || isCreating || !voiceName.trim()"
          @click="startCreation"
        >
          <svg 
            v-if="isCreating"
            class="animate-spin h-5 w-5" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>{{ isCreating ? 'Creating...' : 'Create' }}</span>
        </button>
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

const agreement = ref(false)
const isCreating = ref(false)
const audioUrl = ref(null)
const voiceName = ref('')

const startCreation = async () => {
  if (isCreating.value || !agreement.value || !voiceName.value.trim()) return
  
  isCreating.value = true
  try {
    // 实现克隆逻辑
    await new Promise(resolve => setTimeout(resolve, 2000))
    audioUrl.value = 'path/to/audio.mp3'
  } finally {
    isCreating.value = false
  }
}
</script>

<style scoped>
/* 自定义选择框样式 */
select {
  @apply appearance-none bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
}

/* 自定义复选框样式 */
input[type="checkbox"] {
  @apply w-4 h-4 rounded border-white/10 text-teal-500 focus:ring-teal-500;
}

/* 自定义文本框样式 */
textarea {
  @apply focus:ring-2 focus:ring-teal-500/50 focus:outline-none;
  line-height: 1.5;
}

/* 自定义滚动条 */
textarea::-webkit-scrollbar {
  @apply w-2;
}

textarea::-webkit-scrollbar-track {
  @apply bg-black/20 rounded-full;
}

textarea::-webkit-scrollbar-thumb {
  @apply bg-white/10 rounded-full hover:bg-white/20 transition-colors;
}

/* 添加输入框样式 */
input[type="text"] {
  @apply focus:ring-2 focus:ring-teal-500/50 focus:outline-none;
}

/* 链接颜色也改为 teal */
a {
  @apply text-teal-500 hover:text-teal-400;
}
</style> 