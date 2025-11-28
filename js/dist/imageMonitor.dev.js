"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.imageMonitor = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 *  图片加载管理器, 提供图片的加载，缓存和管理功能
 * 
 * @returns {Object} 图片管理实例
 * @returns {Function} returns.getImage 获取已经加载的图片对象
 * @returns {Function} returns.loadImage 批量加载图片
 *  
 */
var ImageMonitor =
/*#__PURE__*/
function () {
  function ImageMonitor() {
    _classCallCheck(this, ImageMonitor);

    this.imgArray = {};
    this.defaultImage = null; //可设置默认图片

    this.maxRetires = 3; //最大重试次数
  }
  /**
   * 获取已经加载的图片对象
   * @param {string} src 图片的src链接 
   * @returns {Image} 对应的图片对象
   */


  _createClass(ImageMonitor, [{
    key: "getImage",
    value: function getImage(src) {
      return this.imgArray[src] || this.defaultImage;
    }
  }, {
    key: "loadSingleImage",
    value: function loadSingleImage(src) {
      var _this = this;

      var retries = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.maxRetires;
      return new Promise(function (resolve, reject) {
        var img = new Image();
        img.src = src;

        img.onload = function () {
          resolve(img);
        };

        img.onerror = function () {
          if (retries <= 0) {
            reject(Error('图片加载失败'));
            return false;
          }

          setTimeout(function () {
            _this.loadSingleImage(src, retries - 1).then(resolve)["catch"](reject);
          }, 500);
        };
      });
    }
    /**
     * 批量加载图片, 所有图片加载完成后执行完成回调
     * @param {Object} arr 图片链接对象 
     * @param {Function} callback 所有图片加载完成后要执行的回调函数 
     */

  }, {
    key: "loadImage",
    value: function loadImage(arr) {
      var _this2 = this;

      var entries;
      return regeneratorRuntime.async(function loadImage$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              entries = Object.entries(arr);
              _context2.prev = 1;
              _context2.next = 4;
              return regeneratorRuntime.awrap(Promise.all(entries.map(function _callee(_ref) {
                var _ref2, title, src, img;

                return regeneratorRuntime.async(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _ref2 = _slicedToArray(_ref, 2), title = _ref2[0], src = _ref2[1];
                        _context.next = 3;
                        return regeneratorRuntime.awrap(_this2.loadSingleImage(src));

                      case 3:
                        img = _context.sent;
                        _this2.imgArray[title] = img;

                      case 5:
                      case "end":
                        return _context.stop();
                    }
                  }
                });
              })));

            case 4:
              _context2.next = 9;
              break;

            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2["catch"](1);
              throw _context2.t0;

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[1, 6]]);
    }
  }]);

  return ImageMonitor;
}();

var imageMonitor = new ImageMonitor();
exports.imageMonitor = imageMonitor;