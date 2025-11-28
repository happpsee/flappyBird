import { imageMonitor } from "./imageMonitor.js";
import { ctx, getGameRect, getGameScore, getGameStatus, setGameStatus } from "./state.js";
import { audioMonitor } from "./audioMonitor.js";

class Bird {
  constructor () {
    this.resetPosition();
  }

  /**
   * 用于初始化小鸟的初始位置
   */
  resetPosition() {
    const gameRect = getGameRect();
    this.top = gameRect.height / 2;
    this.left = gameRect.width / 2 - 17;
    this.width = 34;
    this.height = 24;
    this.g = 0.5;//初始速度
    this.gravity = this.g;
  }

  /**
   * 小鸟掉落处理函数
   */
  falling() {
    this.gravity *= 1.01;
    this.top += this.gravity;
  }


  /**
   * 小鸟飞翔处理函数
   * @param {number} target 表示小鸟要飞翔到的top位置
   */
  fly(target) {
    //回归到初始速度
    this.gravity = this.g;
    this.top -= 2;
    requestAnimationFrame(() => {
      if (this.top >= target) {
        this.fly(target);
      }
    });
    
  }

  /**
   * 判断小鸟是否碰撞到了游戏的边界部分
   * @returns {boolean} 返回一个布尔值表示小鸟是否碰撞到了游戏的边界
   */
  isBorderCollision() {
    if (this.top <= 0 || this.top >= getGameRect().height - 25) {
      return true;
    }
    return false;
  }

  /**
   * 小鸟的绘画函数
   */
  draw() {
    ctx.drawImage(imageMonitor.getImage('bird'), this.left, this.top, this.width, this.height);
    if (this.isBorderCollision()) {
      setGameStatus('dead');
      //转入死亡界面
      return false;
    }  
    let currentStatus = getGameStatus();
    if (currentStatus === 'dead' || currentStatus === 'pause') {
      return false;//在下降前停止函数执行
    }
    this.falling();
  }

  /**
   * 小鸟的点击事件处理函数
   * @param {number} x 鼠标点击位置相对于游戏界面的x坐标
   * @param {number} y 鼠标点击位置相对于游戏界面的y坐标
   */
  handleEvent(x, y) {
    audioMonitor.playAudio('wing');
    this.fly(this.top - 60);
  }
}


export const bird = new Bird();