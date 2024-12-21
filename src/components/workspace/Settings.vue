<template>
  <div class="w-80 border-l border-white/10 bg-gray-900/50 backdrop-blur-md p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-lg font-medium">设置</h2>
      <button 
        @click="$emit('close')" 
        class="text-gray-400 hover:text-white transition-colors"
      >
        <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    <!-- 设置选项 -->
    <div class="space-y-6">
      <!-- 语音设置 -->
      <div>
        <h3 class="text-sm font-medium text-gray-400 mb-2">语音设置</h3>
        <div class="space-y-4">
          <!-- 语音模型 -->
          <div>
            <label class="block text-sm text-gray-400 mb-1">语音模型</label>
            <select class="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white">
              <option>Eleven Multilingual v2</option>
              <option>Eleven English v1</option>
            </select>
          </div>

          <!-- 稳定性 -->
          <div>
            <label class="block text-sm text-gray-400 mb-1">稳定性</label>
            <div class="flex items-center gap-4">
              <input 
                type="range" 
                class="w-full"
                min="0"
                max="100"
                v-model="stability"
              >
              <span class="text-sm text-gray-400">{{ stability }}%</span>
            </div>
          </div>

          <!-- 相似度 -->
          <div>
            <label class="block text-sm text-gray-400 mb-1">相似度</label>
            <div class="flex items-center gap-4">
              <input 
                type="range" 
                class="w-full"
                min="0"
                max="100"
                v-model="similarity"
              >
              <span class="text-sm text-gray-400">{{ similarity }}%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- API设置 -->
      <div>
        <h3 class="text-sm font-medium text-gray-400 mb-2">API设置</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm text-gray-400 mb-1">API Key</label>
            <input 
              type="password"
              class="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white"
              placeholder="输入你的API密钥"
              v-model="apiKey"
            >
          </div>
        </div>
      </div>

      <!-- 界面设置 -->
      <div>
        <h3 class="text-sm font-medium text-gray-400 mb-2">界面设置</h3>
        <div class="space-y-4">
          <!-- 主题 -->
          <div>
            <label class="block text-sm text-gray-400 mb-1">主题</label>
            <select class="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white">
              <option value="dark">深色</option>
              <option value="light">浅色</option>
              <option value="system">跟随系统</option>
            </select>
          </div>

          <!-- 语言 -->
          <div>
            <label class="block text-sm text-gray-400 mb-1">语言</label>
            <select class="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white">
              <option value="zh">中文</option>
              <option value="en">English</option>
              <option value="ja">日本語</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineEmits(['close'])

const stability = ref(75)
const similarity = ref(85)
const apiKey = ref('')
</script>