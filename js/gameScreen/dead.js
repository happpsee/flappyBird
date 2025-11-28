import { ctx, getGameRect, getGameScore, setGameStatus} from "../state.js";
import { imageMonitor } from "../imageMonitor.js";
import { bird } from "../bird.js";
import pipes from "../pipe.js";
import { audioMonitor } from "../audioMonitor.js";

class DeadScreen {
  constructor() {}

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
   * 1.5秒后切换到结束界面
   */
  switchEnd() {
    if (this.timer) {
      return false;
    }
    audioMonitor.playAudio('hit');
    //1.5秒后转入结束界面
    this.timer = setTimeout(() => {
     setGameStatus('end');
     bird.resetPosition();

     pipes.forEach((pipe) => {
      pipe.isUsing = false;
     })
     clearInterval(this.timer);
     this.timer = undefined;
    }, 1000); 
  }


  /**
   * 绘制死亡时的界面
   */
  draw() {
    pipes.forEach((pipe) => {
      if (!pipe.isUsing) {
        return false;
      }
      pipe.draw();
    })
    bird.draw();
    ctx.drawImage(imageMonitor.getImage('btnPause'), 275, 10, 26, 28);
    this.drawScore(getGameScore());
    ctx.drawImage(imageMonitor.getImage('textGamveOver'), getGameRect().width / 2 - 102, getGameRect().height / 2 - 27, 204, 54);
    this.switchEnd();
  }
}


const deadScreen = new DeadScreen();

export default deadScreen;