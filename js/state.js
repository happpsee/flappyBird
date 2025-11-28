
import { getCurrentTime } from "./utils.js";


//整个游戏dom
export const canvas = document.querySelector('#main');

//游戏canvas上下文
export const ctx = canvas.getContext('2d');

//整个游戏状态
let gameStatus = 'start';

/**
 * 获取整个游戏状态
 * @returns {string} 返回游戏状态
 */
export const getGameStatus = () => gameStatus;

/**
 * 设置游戏状态
 * @param {string} newStatus 将要设置的游戏状态 
 */
export const setGameStatus = (newStatus) => {
  gameStatus = newStatus;
}

//最好的得分
let bestScore = localStorage.getItem('best') || 0;

/**
 * 得到最好的得分
 * @returns {number} 返回最好的得分
 */
export const getBestScore = () => bestScore;

/**
 * 设置最好的得分
 * @param {number} newBest 将要设置的最高得分  
 */
export const setBestScore = (newBest) => {
  bestScore = newBest;
  localStorage.setItem('best', bestScore);
}

//当前次游戏得分
let gameScores = 0;

/**
 * 得到当前次游戏得分
 * @returns {number} 返回当前次游戏的得分数
 */
export const getGameScore = () => gameScores;

/**
 * 更新游戏得分
 * @param {number} scores 将要设置的游戏得分
 */
export const setGameScore = (scores) => {
  if (scores > bestScore) {
    setBestScore(scores);
  }
  gameScores = scores;
};

/**
 * 重置游戏得分
 */
export const resetGameScore = () => {
  gameScores = 0;
}



//游戏界面的宽高
let gameRect = {
  width: canvas.width,
  height: canvas.height
}

/**
 * 得到游戏界面宽高
 * @returns {width, height} 返回游戏界面的宽高对象
 */
export const  getGameRect = () => gameRect;

/**
 * 设置游戏宽高
 * @param {width, height} newRect 将要设置的游戏宽高 
 */
export const setGameRect = (newRect) => {
  gameRect = newRect;
};


/**
 * 获取当前游戏时期的状态，是白天或黑夜
 * @returns {string} 返回游戏时的状态是白天或黑夜
 */
const getDayOrNight = () => {
  const currentHours = getCurrentTime().slice(0, 3);
  let bgc = '';
  if (currentHours > '19' || currentHours < '08') {
    bgc = 'night';
  } 
  else {
    bgc = 'day';
  }
  return bgc;
}

//游戏时期的状态
export let dayStatus = getDayOrNight();