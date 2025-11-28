import { IMAGES,AUDIOS } from "./static.js";
import { imageMonitor } from "./imageMonitor.js";
import {canvas} from './state.js';
import { audioMonitor } from "./audioMonitor.js";
import { GameMonitor } from "./gameMonitor.js";





/**
 * 
 * 初始化，添加绑定事件和循环绘制canvas画布
 */
const init = async () => {
  try {
  //加载图片和音频资源
    await imageMonitor.loadImage(IMAGES);
  } catch(e) {
    document.location.href = '404.html';
    return false;
  }


  audioMonitor.loadAudio(AUDIOS);
  const gameMonitor = new GameMonitor();
   
  //添加点击事件绑定
  canvas.addEventListener('click', (e) => {
    gameMonitor.handleEvent(e.offsetX, e.offsetY);
  })

  const animation = () => {
    gameMonitor.draw();
    requestAnimationFrame(animation);
  }
  animation();
}


init();


