<template>
  <div class="relative flex h-[calc(100vh-4rem)]">
    <!-- 主内容区域 -->
    <div class="flex-1 p-6 pb-[72px] overflow-hidden">
      <!-- 标题和历史按钮 -->
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold text-white">Voice Changer</h1>
        <button 
          class="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors border border-white/10"
        >
          <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
          </svg>
          <span>History</span>
        </button>
      </div>

      <!-- 内容区域 -->
      <div class="mb-6">
        <!-- 默认上传区域 -->
        <div v-if="!isRecording" 
          class="relative group border-2 border-dashed border-white/10 hover:border-teal-500/50 rounded-lg p-12 text-center transition-all duration-200 bg-black/20"
        >
          <div class="flex flex-col items-center gap-6">
            <div class="w-20 h-20 rounded-full bg-teal-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <svg class="w-10 h-10 text-teal-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
              </svg>
            </div>
            <div class="space-y-2 text-gray-400">
              <div class="text-sm">Drag and drop an audio file</div>
              <div class="text-sm">Audio file up to 50mb</div>
            </div>
            <div class="flex gap-4">
              <button class="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                Upload audio
              </button>
              <button 
                @click="startRecording"
                class="px-6 py-2 bg-white/5 text-gray-300 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              >
                Record audio
              </button>
            </div>
          </div>
          <input type="file" class="absolute inset-0 opacity-0 cursor-pointer" accept="audio/*" />
        </div>

        <!-- 录音界面 -->
        <div v-else class="flex flex-col items-center gap-8">
          <!-- 波形显示 -->
          <div class="w-full h-32 bg-black/20 rounded-lg flex items-center justify-center">
            <div v-if="!isRecordingStarted" class="text-gray-400">
              Click the microphone to start recording
            </div>
            <div v-else class="flex items-center gap-2">
              <div v-for="i in 10" :key="i" 
                class="w-2 bg-teal-500 rounded-full animate-pulse"
                :style="{
                  height: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.1}s`
                }"
              ></div>
            </div>
          </div>

          <!-- 录音控制 -->
          <div class="flex items-center gap-6">
            <button 
              class="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200"
              :class="isRecordingStarted ? 'bg-red-500 text-white' : 'bg-teal-500/20 text-teal-500 hover:scale-110'"
              @click="toggleRecording"
            >
              <svg class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path v-if="!isRecordingStarted" d="M12 15c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3z"/>
                <rect v-else x="7" y="7" width="10" height="10" rx="2"/>
              </svg>
            </button>
            <div class="text-xl font-mono text-white tabular-nums">
              {{ recordingTime }}
            </div>
            <button 
              v-if="isRecordingStarted"
              @click="stopRecording"
              class="px-4 py-2 bg-white/5 text-gray-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>

      <!-- 声音选择区域 -->
      <div class="space-y-4">
        <div class="flex items-center gap-4">
          <div class="flex-1">
            <select class="w-full appearance-none bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white">
              <option>Chris</option>
              <option>Rachel</option>
              <option>Dave</option>
            </select>
          </div>
          <button class="px-4 py-2.5 bg-black/20 border border-white/10 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
            Settings
          </button>
        </div>

        <!-- 生成按钮 -->
        <button 
          class="w-full py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-all duration-200 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          :disabled="isGenerating"
          @click="startGeneration"
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
          <span>{{ isGenerating ? 'Generating...' : 'Generate' }}</span>
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
import { ref, computed } from 'vue'
import AudioPlayer from './AudioPlayer.vue'

const isRecording = ref(false)
const isRecordingStarted = ref(false)
const isGenerating = ref(false)
const audioUrl = ref(null)
const recordingStartTime = ref(null)
const currentTime = ref(0)

// 格式化录音时间
const recordingTime = computed(() => {
  const seconds = Math.floor(currentTime.value / 1000)
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
})

// 开始录音
const startRecording = () => {
  isRecording.value = true
}

// 切换录音状态
const toggleRecording = () => {
  if (!isRecordingStarted.value) {
    isRecordingStarted.value = true
    recordingStartTime.value = Date.now()
    // 开始计时
    startTimer()
  } else {
    stopRecording()
  }
}

// 停止录音
const stopRecording = () => {
  isRecordingStarted.value = false
  stopTimer()
  // 这里可以处理录音数据
}

// 计时器
let timer = null
const startTimer = () => {
  timer = setInterval(() => {
    currentTime.value = Date.now() - recordingStartTime.value
  }, 100)
}

const stopTimer = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

const startGeneration = async () => {
  if (isGenerating.value) return
  
  isGenerating.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 2000))
    audioUrl.value = 'path/to/audio.mp3'
  } finally {
    isGenerating.value = false
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

/* 波形动画 */
@keyframes pulse {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(0.3); }
}

.animate-pulse {
  animation: pulse 1s ease-in-out infinite;
}
</style> 