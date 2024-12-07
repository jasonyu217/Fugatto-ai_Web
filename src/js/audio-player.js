export class AudioPlayer {
  constructor(audioElement) {
    this.audio = audioElement;
    this.audioUrl = null;
  }

  setAudioSource(url) {
    if (this.audioUrl) {
      URL.revokeObjectURL(this.audioUrl);
    }
    this.audioUrl = url;
    this.audio.src = url;
  }

  play() {
    return this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}