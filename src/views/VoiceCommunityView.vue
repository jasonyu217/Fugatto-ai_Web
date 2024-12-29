<template>
  <div class="voice-community">
    <h1 class="page-title">Voice Community</h1>
    
    <!-- 创意示例部分 -->
    <section class="section">
      <h2>创意示例</h2>
      <div class="examples-grid">
        <div class="example-card">
          <h3>说唱歌曲</h3>
          <div class="audio-player">
            <audio controls>
              <source src="/audio/rap song.mp3" type="audio/mp3">
            </audio>
          </div>
          <p class="tags">
            <span class="tag">声音合成</span>
            <span class="tag">文字转语音</span>
            <span class="tag">文字转音频</span>
          </p>
        </div>

        <div class="example-card">
          <h3>电影配乐</h3>
          <div class="audio-player">
            <audio controls>
              <source src="https://fugatto-ai.com/audio/rap backing track.mp3" type="audio/mp3">
            </audio>
          </div>
          <p class="tags">
            <span class="tag">配乐合成</span>
            <span class="tag">音效</span>
          </p>
        </div>
      </div>
    </section>

    <!-- 新兴声音部分 -->
    <section class="section">
      <h2>新兴声音</h2>
      <div class="sound-table">
        <table>
          <thead>
            <tr>
              <th>音频</th>
              <th>描述</th>
              <th>创新点</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <audio controls>
                  <source src="/audio/Electronic Dance Music, Dogs Barking, Cats Meowing.wav" type="audio/wav">
                </audio>
              </td>
              <td>Electronic Dance Music, Dogs Barking, Cats Meowing</td>
              <td>Dogs barking in sync with the music.</td>
            </tr>
            <tr>
              <td>
                <audio controls>
                  <source src="/audio/Banjo and rainfall.wav" type="audio/wav">
                </audio>
              </td>
              <td>Banjo and rainfall</td>
              <td>Unique sound combination</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'VoiceCommunityView'
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