"use strict";

var _static = require("./static.js");

var _imageMonitor = require("./imageMonitor.js");

var _state = require("./state.js");

var _audioMonitor = require("./audioMonitor.js");

var _gameMonitor = require("./gameMonitor.js");

/**
 * 
 * 初始化，添加绑定事件和循环绘制canvas画布
 */
var init = function init() {
  var gameMonitor, animation;
  return regeneratorRuntime.async(function init$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_imageMonitor.imageMonitor.loadImage(_static.IMAGES));

        case 3:
          _context.next = 9;
          break;

        case 5:
          _context.prev = 5;
          _context.t0 = _context["catch"](0);
          document.location.href = '404.html';
          return _context.abrupt("return", false);

        case 9:
          _audioMonitor.audioMonitor.loadAudio(_static.AUDIOS);

          gameMonitor = new _gameMonitor.GameMonitor(); //添加点击事件绑定

          _state.canvas.addEventListener('click', function (e) {
            gameMonitor.handleEvent(e.offsetX, e.offsetY);
          });

          animation = function animation() {
            gameMonitor.draw();
            requestAnimationFrame(animation);
          };

          animation();

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 5]]);
};

init();