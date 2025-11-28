import { ctx, getGameStatus, setGameStatus, setGameScore, getGameScore } from "../state.js";
import { imageMonitor } from "../imageMonitor.js"; 
import { bird } from "../bird.js";
import pipes from "../pipe.js";
import { getRandom } from "../utils.js";
import { isCollision } from "../judgeCollision.js";




class PlayingScreen {
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
   * 开启使用一个pipe管道
   */
  addPipe() {
    if (this.timer) {
      return false;
    }

    this.timer = setTimeout(() => {
      //是有这种可能的，当死亡的时候，又开出来一个pipes了，这个时候要判断当前状态是否为playing再决定是否启用这个
      if (getGameStatus() !== 'playing') {
        this.timer = undefined;
        return false;
      }
      const len = pipes.length;
      for (let i = 0; i < len; i++) {
        if (!pipes[i].isUsing) {      
          pipes[i].isUsing = true;
          break;
        }
      }
      this.timer = undefined;
    }, getRandom(2000, 5000)); 
  }

  /**
   * 绘制游戏时界面
   */
  draw() {
    this.addPipe();
    bird.draw();
    pipes.forEach((pipe) => {
      if (!pipe.isUsing) {
        return false;
      }
      //碰撞检测
      if (isCollision(pipe)) {
        setGameStatus('dead');
      }
      if ((!pipe.isScored) && bird.left > pipe.left + pipe.width) {
        setGameScore(getGameScore() + 1);
        pipe.isScored = true;
      }
      pipe.draw();
    });
    ctx.drawImage(imageMonitor.getImage('btnPause'), 275, 10, 26, 28);
    this.drawScore(getGameScore());

  }

  /**
   * 根据传入的x, y判断是否点击了暂停按钮
   * @param {number} x 表示相对于canvas矩形的x轴
   * @param {number} y 表示相对于canvas矩形的y轴
   * @returns {boolean} 返回布尔值表示是否点击到了游戏暂停按钮
   */
  isPauseBtn (x, y) {
    if (x >= 275 && x <= 310 && y >= 12 && y <= 35) {
      return true;
    }
    return false;
  }


  /**
   * 处理游戏时期的点击事件
   * @param {number} x 鼠标点击位置相对于游戏界面的x坐标
   * @param {number} y 鼠标点击位置相对于游戏界面的y坐标
   */
  handleEvent(x, y) {
    if (this.isPauseBtn(x, y)) {
      //转入暂停界面
      setGameStatus('pause');
      return false;
    }
    bird.handleEvent(x, y);
  }
}


const playScreen = new PlayingScreen();

export default playScreen;