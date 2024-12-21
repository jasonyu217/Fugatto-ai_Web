<template>
  <div class="bg-gray-900/95 backdrop-blur-md border-t border-white/10">
    <!-- 收起/展开按钮 -->
    <button 
      @click="isExpanded = !isExpanded"
      class="absolute -top-8 right-4 bg-gray-900/95 backdrop-blur-md px-4 py-1 rounded-t-lg border border-white/10 border-b-0 text-gray-400 hover:text-white transition-colors"
    >
      <svg 
        class="w-4 h-4 transition-transform duration-200"
        :class="{ 'rotate-180': isExpanded }"
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
      </svg>
    </button>

    <!-- 播放器主体 -->
    <div class="transition-all duration-300" :class="isExpanded ? 'h-32' : 'h-16'">
      <div class="h-full px-6 flex items-center gap-4">
        <!-- 左侧：播放控制和时间 -->
        <div class="flex items-center gap-4 min-w-[200px]">
          <button class="text-gray-400 hover:text-white transition-colors">
            <svg class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
          <div class="text-sm text-gray-400 tabular-nums">
            <span>{{ currentTime }}</span>
            <span class="mx-1">/</span>
            <span>{{ duration }}</span>
          </div>
        </div>

        <!-- 中间：进度条 -->
        <div class="flex-1">
          <div class="relative h-1 bg-white/10 rounded-full">
            <div 
              class="absolute left-0 top-0 h-full bg-teal-500 rounded-full"
              :style="{ width: `${progress}%` }"
            ></div>
            <div 
              class="absolute -top-2 h-5 w-5 bg-teal-500 rounded-full cursor-pointer shadow-lg"
              :style="{ left: `${progress}%` }"
            ></div>
          </div>
        </div>

        <!-- 右侧：播放速度和下载按钮 -->
        <div class="flex items-center gap-4 min-w-[200px]" v-if="isExpanded">
          <select 
            v-model="playbackRate"
            class="bg-black/20 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white"
          >
            <option value="0.5">0.5x</option>
            <option value="1">1x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>
          
          <button 
            @click="downloadAudio"
            class="flex items-center gap-2 px-3 py-1.5 bg-black/20 border border-white/10 rounded-lg text-sm text-gray-300 hover:text-white transition-colors"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isExpanded = ref(false)
const playbackRate = ref(1)
const progress = ref(0)
const currentTime = ref('0:00')
const duration = ref('0:32')

const downloadAudio = () => {
  // 实现下载逻辑
}
</script>