import { ctx, setGameStatus } from "../state.js";
import { bird } from "../bird.js";
import pipes from "../pipe.js";
import { imageMonitor } from "../imageMonitor.js"; 
import {  getGameScore } from "../state.js";




class PauseScreen {
  constructor() {
  }


  /**
   * 绘制得分
   */
  drawScore(score) {
    ctx.save();
    ctx.font = "Bold "+ 50 +"px Arial";
    ctx.textAlign = "left";
    ctx.fillStyle = '#ffffff';
    ctx.shadowOffsetX = 3; // 设置水平位移
    ctx.shadowOffsetY = 3; // 设置垂直位移
    ctx.shadowBlur = 3; // 设置模糊度
    ctx.shadowColor = "black"; // 设置阴影颜色
    ctx.fillText(score, 150, 80);
    ctx.restore();
  }

  /**
   * 绘制暂停时界面
   */
  draw() {
    pipes.forEach((pipe) => {
      if (!pipe.isUsing) {
        return false;
      }
      pipe.draw();
    })
    bird.draw();
    ctx.drawImage(imageMonitor.getImage('btnResume'), 275, 10, 26, 28);
    this.drawScore(getGameScore());

  }

  /**
   * 根据传入的x, y判断是否点击了播放按钮
   * @param {number} x 表示相对于canvas矩形的x轴
   * @param {number} y 表示相对于canvas矩形的y轴
   * @returns {boolean} 返回布尔值表示是否点击到了游戏暂停按钮
   */
  isPlayrBtn (x, y) {
    if (x >= 275 && x <= 310 && y >= 12 && y <= 35) {
      return true;
    }


    return false;
  }


  /**
   * 处理游戏暂停时期的点击事件
   * @param {number} x 鼠标点击位置相对于游戏界面的x坐标
   * @param {number} y 鼠标点击位置相对于游戏界面的y坐标
   */
  handleEvent(x, y) {
    if (this.isPlayrBtn(x, y)) {
      //转入播放界面
      setGameStatus('playing');
    }
  }
}


const pauseScreen = new PauseScreen();

export default pauseScreen;