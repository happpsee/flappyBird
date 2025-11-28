import { imageMonitor } from "./imageMonitor.js";
import {ctx, getGameRect} from "./state.js"
import { screenMap}  from "./gameScreen/index.js";
import { dayStatus} from "./state.js";
import { getGameStatus } from "./state.js";
/**
 * 管理游戏管理类, 记录得分，绘制图画等等
 */
export class GameMonitor {


  constructor() {
    const rect = getGameRect();
    this.gameWidth = rect.width;
    this.gameHeight = rect.height;
  }

  /**
   * 用于设置整个游戏背景
   */
  drawBgcImg() {
    ctx.drawImage(imageMonitor.getImage(dayStatus), 0, 0, this.gameWidth, this.gameHeight);
  }
  
  /**
   * 绘画函数，根据当前的游戏状态选择相应的函数进行绘画
   */
  draw() {
    this.drawBgcImg();
    let status = getGameStatus();
    screenMap[status]?.draw && screenMap[status].draw();
  }

  /**
   * 处理事件监听对象
   * @param {number} x 鼠标点击位置相对于游戏界面的x坐标
   * @param {number} y 鼠标点击位置相对于游戏界面的y坐标
   */
  handleEvent(x, y) {
    let status = getGameStatus();
    screenMap[status]?.handleEvent && screenMap[status].handleEvent(x, y);
  }
}


