<template>
  <div class="ai-audio">
    <h1>AI音频创作</h1>
    <div class="creation-form">
      <div class="form-group">
        <label>提示词</label>
        <textarea 
          v-model="prompt" 
          placeholder="请输入提示词来描述您想要生成的音频..."
          rows="4"
        ></textarea>
      </div>
      
      <div class="form-group">
        <label>音频类型</label>
        <select v-model="audioType">
          <option value="voice">AI声音</option>
          <option value="music">AI音乐</option>
        </select>
      </div>
      
      <button class="create-btn" @click="generateAudio">
        生成音频
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AIAudioView',
  data() {
    return {
      prompt: '',
      audioType: 'voice'
    }
  },
  methods: {
    generateAudio() {
      // TODO: 实现音频生成逻辑
      console.log('生成音频', this.prompt, this.audioType)
    }
  }
}
</script>

<style scoped>
.ai-audio {
  padding: 20px;
}

.creation-form {
  max-width: 600px;
  margin: 20px auto;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.create-btn {
  background: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.create-btn:hover {
  background: #45a049;
}
</style> 