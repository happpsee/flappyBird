


const TIMER = Symbol('timer');

/**
 * 音频加载管理器，提供音频的播放，缓存和管理功能
 */
class AudioMonitor {
  constructor() {
    this.audioArray = {};
  }

  /**
   * 播放指定音频
   * @param {string} src 音频的名称字符串
   */
  playAudio(src) {
    if (!this.audioArray[src]) {
      throw new Error('不存在该音频资源!!!');
    }
    if (Date.now() - this.audioArray[src][TIMER] < 30) {
      return false;
    }
    this.audioArray[src][TIMER] = Date.now();
    this.audioArray[src].play();
  }

  /**
   * 加载指定音频
   * @param {object} arr 一个包含要加载的音频 {名称: 链接} 的对象 
   */
  loadAudio(arr) {
    Object.entries(arr).forEach(([key, value]) => {
      let audio = new Audio(value);
      this.audioArray[key] = audio;
      this.audioArray[key][TIMER] = Date.now();
    });
  }
}


export const audioMonitor = new AudioMonitor();

