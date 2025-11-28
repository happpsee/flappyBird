import start from "./start.js";
import playing from "./playing.js";
import pause from "./pause.js";
import dead from "./dead.js";
import end from "./end.js";








//收集所有屏幕实例，导出一个实例集合对象
export const screenMap = {
  start,
  playing,
  pause,
  dead,
  end
};