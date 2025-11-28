import { audioMonitor } from "../audioMonitor.js";
import { imageMonitor } from "../imageMonitor.js";
import { ctx, getBestScore, getGameRect, getGameScore, setGameStatus, resetGameScore } from "../state.js";

class EndScreen {
  constructor() { }

  /**
   * 绘制结束界面
   */
  draw() {
    ctx.drawImage(imageMonitor.getImage('title'), 80, 100, 178, 48);
    ctx.drawImage(imageMonitor.getImage('scorePanel'), getGameRect().width / 2 - 120, getGameRect().height / 2, 238, 126);
    ctx.drawImage(imageMonitor.getImage(`medals${Math.floor(getGameScore() / 25)}`), getGameRect().width / 2 - 89, getGameRect().height / 2 + 44, 44, 44);
    ctx.save();
    ctx.font = "Bold "+ 20 +"px Arial";
    ctx.textAlign = "left";
    ctx.fillStyle = '#ffffff';
    ctx.shadowOffsetX = 3; // 设置水平位移
    ctx.shadowOffsetY = 3; // 设置垂直位移
    ctx.shadowBlur = 3; // 设置模糊度
    ctx.shadowColor = "black"; // 设置阴影颜色
    ctx.fillText(getGameScore(), getGameRect().width - 96, getGameRect().height / 2 + 50);
    ctx.fillText(getBestScore(), getGameRect().width - 96, getGameRect().height / 2 + 100);
    ctx.restore();
    ctx.drawImage(imageMonitor.getImage('btnPlay'), getGameRect().width / 2 - 60, getGameRect().height - 100 , 116, 70);
  }

  /**
   * 监听是否点击到了开始界面
   * @param {number} x 鼠标点击位置相对于游戏界面的x坐标
   * @param {number} y 鼠标点击位置相对于游戏界面的y坐标
   * @returns {boolean} 返回一个布尔值表示是否点击了开始界面
   */
  isPlay(x, y) {
    console.log(x, y);
    if (x >= 111 && x <= 208 && y >= 386 && y <= 433) {
      return true;
    }
    return false;
  }

  /**
   * 结束界面处理点击事件函数
   * @param {number} x 鼠标点击位置相对于游戏界面的x坐标
   * @param {number} y 鼠标点击位置相对于游戏界面的y坐标 
   */
  handleEvent(x, y) {
    if (this.isPlay(x, y)) {
      setGameStatus('playing');
      audioMonitor.playAudio('point');
      resetGameScore();
      return false;
    }
  
  }
}


const endScreen = new EndScreen();

export default endScreen;
