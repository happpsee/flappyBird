import { imageMonitor } from "./imageMonitor.js";
import { ctx, getGameRect, getGameScore, getGameStatus, setGameScore } from "./state.js";
import { getRandom } from "./utils.js";



class Pipe {
  constructor() {
    //表示是否出现在图片中
    this.reset();
  }

  //用于设置这个管道是否正在被使用或报废
  set isUsing (use) {
    if (!use) {
      this.reset();
    }
    this.used = use;
  }
  //得到管道的使用状态
  get isUsing() {
    return this.used;
  }

  /**
   * 初始化管道状态，设置为报废状态
   */
  reset () {
    const width = getGameRect().width;
    const height = getGameRect().height;
    //整个高度，拆分成十分,每个最多取3份, 剩下的匀给空白高度
    this.width = getGameRect().width / 5;
    this.upHeight = getRandom(height / 10, height / 3);
    this.downHeight = getRandom(height / 10, height / 3);
    this.blank = height - this.upHeight - this.downHeight;
    this.left = width;
    this.isScored = false;
  }

  /**
   * 管道使用时期时的移动
   */
  move() {
    this.left -= 0.4;
    //当绘制超出了屏幕的时候我们重置等待下一次使用
    
    if (this.left + this.width < -10) {
      //报废,重置等待被再次使用
      this.isUsing = false;
      return false;
    }
  }

  /**
   * 管道的绘制函数
   */
  draw() {
    let height = getGameRect().height;
    ctx.drawImage(imageMonitor.getImage('pipeDown'), this.left, 0, this.width, this.upHeight);
    ctx.drawImage(imageMonitor.getImage('pipeUp'), this.left, height - this.downHeight, this.width, this.downHeight);
    
    let currentStatus = getGameStatus();
    if (currentStatus === 'dead' || currentStatus === 'pause') {
      return false;//在移动前停止函数
    }
    this.move();

  }
}


const pipes = Array.from({length: 2}, () => new Pipe());
//默认两个pipes
export default pipes;