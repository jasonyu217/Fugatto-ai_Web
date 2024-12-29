<template>
  <div class="flex h-full">
    <!-- 保持与其他workspace组件相同的布局结构 -->
    <div class="flex-1 p-6">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-2xl font-bold mb-6">AI音频创作</h1>
        
        <div class="space-y-6">
          <div class="form-group">
            <label class="block text-sm font-medium mb-2">提示词</label>
            <textarea 
              v-model="prompt" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入提示词来描述您想要生成的音频..."
              rows="4"
            ></textarea>
          </div>
          
          <div class="form-group">
            <label class="block text-sm font-medium mb-2">音频类型</label>
            <select 
              v-model="audioType"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="voice">AI声音</option>
              <option value="music">AI音乐</option>
            </select>
          </div>
          
          <button 
            @click="generateAudio"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            生成音频
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AIAudioCreation',
  data() {
    return {
      prompt: '',
      audioType: 'voice'
    }
  },
  methods: {
    generateAudio() {
      console.log('生成音频', this.prompt, this.audioType)
    }
  }
}
</script> 