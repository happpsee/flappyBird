import { bird } from "./bird.js";



//碰撞判断器
export const isCollision = (pipe) =>  {
  //要是x轴上没有接触到，直接返回true表示没有碰撞
  if ((bird.left + bird.width < pipe.left) || (bird.left > pipe.left + pipe.width)) {
    return false;
  }

  //判断上柱子或下柱子是否有一个碰撞到了
  const up = bird.top > pipe.upHeight;//判断是否碰撞到了上柱子
  const down = bird.top + bird.height < pipe.upHeight + pipe.blank;
  if (up && down) {
    return false;
  }
  return true;
}