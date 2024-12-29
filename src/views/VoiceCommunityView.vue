<template>
  <div class="voice-community">
    <!-- 背景渐变 -->
    <div class="background-gradient"></div>

    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="nav-content">
        <a href="/" class="nav-logo">Fugatto AI</a>
      </div>
    </nav>

    <!-- 主要内容 -->
    <main class="container">
      <h1 class="page-title">Voice Community</h1>
      
      <!-- 介绍部分 -->
      <section class="intro-section">
        <!-- 从HTML版本复制完整的内容 -->
      </section>

      <!-- 其他部分... -->
    </main>
  </div>
</template>

<script>
export default {
  name: 'VoiceCommunityView',
  mounted() {
    // 音频错误处理
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
      audio.addEventListener('error', this.handleAudioError);
      audio.addEventListener('loadstart', this.handleAudioLoadStart);
      audio.addEventListener('canplay', this.handleAudioCanPlay);
    });
  },
  methods: {
    handleAudioError(e) {
      console.error('Audio loading failed:', e);
      const playerContainer = e.target.parentElement;
      playerContainer.innerHTML = `
        <div class="audio-error">
          Audio loading failed, please try again later
        </div>
      `;
    },
    handleAudioLoadStart(e) {
      e.target.parentElement.classList.add('loading');
    },
    handleAudioCanPlay(e) {
      e.target.parentElement.classList.remove('loading');
    }
  }
}
</script>

<style scoped>
.voice-community {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  color: var(--color-heading);
  font-size: 2rem;
  margin-bottom: 2rem;
}

.section {
  margin-bottom: 3rem;
}

.section h2 {
  color: var(--color-heading);
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.example-card {
  background: var(--color-background-soft);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.example-card h3 {
  color: var(--color-heading);
  margin-bottom: 1rem;
}

.audio-player {
  margin: 1rem 0;
}

.audio-player audio {
  width: 100%;
}

.tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  background: var(--color-border);
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-size: 0.875rem;
}

.sound-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
}

th {
  background: var(--color-background-soft);
  color: var(--color-heading);
}
</style> 