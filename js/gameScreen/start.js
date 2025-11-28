import { audioMonitor } from "../audioMonitor.js";
import { imageMonitor } from "../imageMonitor.js";
import { setGameStatus, ctx } from "../state.js";


class drawStartScreen {
  constructor() {

  }
  /**
   * 绘制出开始界面
   */
  draw() {
    ctx.drawImage(imageMonitor.getImage('title'), 80, 100, 178, 48);
    ctx.drawImage(imageMonitor.getImage('tutorial'), 110, 200, 114, 98);
    ctx.drawImage(imageMonitor.getImage('btnPlay'), 110, 350, 116, 70);
  }
  /**
   * 根据传入的x, y判断是是否开启了play按钮
   * @param {number} x 表示当前的鼠标位置相对于canvas矩形的x轴坐标
   * @param {number} y 表示当前的鼠标位置相对于canvas矩形的y轴坐标
   * @returns {boolean} 返回布尔值表示是否点击到了开始游戏按钮
   */
  isPlayBtn (x, y) {
    if (x >= 120 && x <= 215 && y >= 350 && y <= 400 ) {
      return true;
    }
    return false;
  }

  /**
   * 开始界面的点击事件处理函数
   * @param {number} x 鼠标点击位置相对于游戏界面的x坐标
   * @param {number} y 鼠标点击位置相对于游戏界面的y坐标
   */
  handleEvent(x, y) {
    if (this.isPlayBtn(x, y)) {
      //转入playing
       setGameStatus('playing');
       audioMonitor.playAudio('point');
      return false;
    }
  }
}



const startScreen = new drawStartScreen();

export default startScreen;