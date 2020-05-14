(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ImgClip"] = factory();
	else
		root["ImgClip"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var _regeneratorRuntime = __webpack_require__(2);

var _asyncToGenerator = __webpack_require__(4);

var _classCallCheck = __webpack_require__(5);

var _createClass = __webpack_require__(6);

var utils = __webpack_require__(7);

var ImgClip = /*#__PURE__*/function () {
  "use strict";

  /**
   * @param {*} els element collect, frameEl、imgEl、uploadEl of button、top operatAble box
   * @param {*} options
   * @param {*} hooks
   */
  function ImgClip(els) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var hooks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, ImgClip);

    var uploadEl = els.uploadEl,
        imgEl = els.imgEl,
        boxEl = els.boxEl,
        frameEl = els.frameEl;
    this.uploadEl = uploadEl;
    this.imgEl = imgEl;
    this.boxEl = boxEl;
    this.frameEl = frameEl;
    this.options = options;
    this.hooks = hooks;
    this.init();
  }

  _createClass(ImgClip, [{
    key: "init",
    value: function init() {
      this.registerListener();
      this.data = {
        finalLeft: 0,
        finalTop: 0
      };
      this.events = {
        touchstartEv: {}
      };
      this.scaleConvertRatio = 400 / 0.1;
      this.defaultScale = 1;
      this.scale = 1; // when final scale bigger than this value
      // then use this value

      this.options.biggestScale = 2; // when final scale smaller than this value
      // then use this value

      this.options.minimalScale = 0.1;
      this.options.singleBiggestScale = 0.3; // limit zoom out ratio

      this.devicePixelRatio = window.devicePixelRatio > 3 && 3 || window.devicePixelRatio || 1;
    }
  }, {
    key: "registerListener",
    value: function registerListener() {
      var _this = this;

      this.uploadEl.onchange = this.localImgHandle.bind(this);
      this.boxEl.addEventListener('touchstart', function (e) {
        _this.events.touchstartEv = e.touches[0];
        var isTwoFingersTouch = e.touches.length === 2;

        if (isTwoFingersTouch) {
          if (!_this.options.scaleEnable) return;
          _this.touchStartDistance = utils.getDistance({
            x: e.touches[0].pageX,
            y: e.touches[0].pageY
          }, {
            x: e.touches[1].pageX,
            y: e.touches[1].pageY
          });
        } // begin judge single or double point


        if (!_this.isInImgArea(_this.events.touchstartEv)) {
          _this.dragable = false;
        }
      });
      this.boxEl.addEventListener('touchmove', function (e) {
        e.preventDefault();

        if (e.touches.length >= 2) {
          if (!_this.options.scaleEnable) return; // operate double

          _this.twoFingersScale(e);
        } else {
          // operate single
          if (requestAnimationFrame) {
            requestAnimationFrame(_this.dragging.bind(_this, e));
          } else {
            _this.dragging(e);
          }
        }
      });
      this.boxEl.addEventListener('touchend', function () {
        // reset dragable
        _this.dragable = true;
      });
    }
  }, {
    key: "destory",
    value: function () {
      var _destory = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return utils.wait(1000);

              case 2:
                this.uploadEl.value = '';
                this.imgEl.src = '';
                this.data = {
                  finalLeft: 0,
                  finalTop: 0
                };
                this.imgEl.style.transform = utils.getTransformMatrix({
                  scale: 1,
                  translateX: 0,
                  translateY: 0
                }); // release preview img object url RAM
                // eslint-disable-next-line

                this.previewObjectUrl && window.URL.revokeObjectURL(this.previewObjectUrl);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function destory() {
        return _destory.apply(this, arguments);
      }

      return destory;
    }()
  }, {
    key: "tapHooks",
    value: function tapHooks(type, data) {
      if (this.hooks[type]) {
        this.hooks[type](data);
      }
    }
  }, {
    key: "dragging",
    value: function dragging(e) {
      if (this.dragable === false) {
        return;
      }

      var touchstartEv = this.events.touchstartEv;
      var touchend = e.touches[0];
      var moveX = touchend.pageX - touchstartEv.pageX;
      var moveY = touchend.pageY - touchstartEv.pageY;
      this.data.finalLeft += moveX;
      this.data.finalTop += moveY;
      this.imgEl.style.transform = utils.getTransformMatrix({
        scale: this.scale,
        translateX: this.data.finalLeft,
        translateY: this.data.finalTop
      });
      this.events.touchstartEv = touchend;
    }
  }, {
    key: "twoFingersScale",
    value: function twoFingersScale(e) {
      var touchOne = e.touches[0];
      var touchTwo = e.touches[1];
      var distance = utils.getDistance({
        x: touchOne.pageX,
        y: touchOne.pageY
      }, {
        x: touchTwo.pageX,
        y: touchTwo.pageY
      });
      var scale = this.distanceToScale(distance);
      this.scale = this.getFinalScale(scale);
      this.imgEl.style.transform = utils.getTransformMatrix({
        scale: this.scale,
        translateX: this.data.finalLeft,
        translateY: this.data.finalTop
      });
      console.log('two fingers touch', distance, scale, this.scale);
    }
  }, {
    key: "getFinalScale",
    value: function getFinalScale(scale) {
      var _this$options = this.options,
          minimalScale = _this$options.minimalScale,
          biggestScale = _this$options.biggestScale;
      var finalScale;
      finalScale = this.scale * scale;
      finalScale = finalScale < minimalScale && minimalScale || finalScale > biggestScale && biggestScale || finalScale;
      return finalScale;
    }
  }, {
    key: "distanceToScale",
    value: function distanceToScale(distance) {
      var moveDistance = distance - this.touchStartDistance;
      var scale = moveDistance / this.scaleConvertRatio;
      var limitScale = Math.abs(scale) > this.options.singleBiggestScale && this.options.singleBiggestScale || Math.abs(scale);
      return scale > 0 ? limitScale : Number("-".concat(limitScale));
    }
  }, {
    key: "isInImgArea",
    value: function isInImgArea(e) {
      // x < e.x < x + w
      // y < e.y < y + h
      var imgOffset = this.getOffset(this.imgEl);
      var pointX = e.pageX,
          pointY = e.pageY; // fn of console will spend 113 ms in CPU 6x slowdown
      // console.log('is in img area', pointX, pointY, imgOffset.x, imgOffset.y);

      if (pointX > imgOffset.x.min && pointX < imgOffset.x.max && pointY > imgOffset.y.min && pointY < imgOffset.y.max) {
        return true;
      }

      return false;
    }
  }, {
    key: "getOffset",
    value: function getOffset(el) {
      var range = {
        x: {},
        y: {}
      };

      if (el.getBoundingClientRect) {
        var positions = el.getBoundingClientRect();
        range.x = {
          // two left edge
          // browser of uc positions.x will return udefined
          // so need instead of postions.left
          min: positions.left,
          // two right edge
          max: positions.left + positions.width
        };
        range.y = {
          min: positions.top,
          max: positions.top + positions.height
        };
        range.width = positions.width;
        range.height = positions.height;
      } else {// compatible the feature of el.getBoundingClientRect does not exist
      }

      return range;
    }
  }, {
    key: "getClipImgArea",
    value: function () {
      var _getClipImgArea = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
        var outputType,
            formDataOptions,
            imgOffset,
            frameOffset,
            origin,
            blob,
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                outputType = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : 'blob';
                formDataOptions = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
                // get clip img area, then clipping
                // computed left top point's position in img
                imgOffset = this.getOffset(this.imgEl); // if document height > 100 vh, frameEl.y.min will smaller than real value
                // but under actual conditions, the document height must be 100vh
                // because user has seted body height as 100vh

                frameOffset = this.getOffset(this.frameEl); // the origin point is left top point

                origin = this.computedOrigin(imgOffset, frameOffset);
                console.log('origin', origin);
                _context2.next = 8;
                return this.clip(origin, this.imgEl);

              case 8:
                blob = _context2.sent;

                if (this.hooks.afterClip && this.hooks.afterClip.params && this.hooks.afterClip.params.type === 'formData') {
                  this.tapHooks('afterClip', this.createFormData(blob, formDataOptions));
                } else {
                  this.tapHooks('afterClip', blob);
                }

                this.destory();

                if (!(outputType === 'formData')) {
                  _context2.next = 13;
                  break;
                }

                return _context2.abrupt("return", this.createFormData(blob, formDataOptions));

              case 13:
                return _context2.abrupt("return", blob);

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getClipImgArea() {
        return _getClipImgArea.apply(this, arguments);
      }

      return getClipImgArea;
    }()
  }, {
    key: "createFormData",
    value: function createFormData(blob) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      // return img stream
      var formData = new FormData();
      formData.append('file', blob); // eslint-disable-next-line

      for (var prop in options) {
        // eslint-disable-next-line
        if (options.hasOwnProperty(prop)) {
          // upload extra params
          formData.append(prop, options[prop]);
        }
      }

      return formData;
    }
  }, {
    key: "computedOrigin",
    value: function computedOrigin(imgOffset, frameOffset) {
      // computed bonding area between picture and photo frame
      var origin = {};
      var extraBeyond = {
        width: 0,
        height: 0
      }; // The origin of the picture placed in the canvas

      origin.relateFrameLeft = imgOffset.x.min - frameOffset.x.min > 0 ? imgOffset.x.min - frameOffset.x.min : 0;
      origin.relateFrameTop = imgOffset.y.min - frameOffset.y.min > 0 ? imgOffset.y.min - frameOffset.y.min : 0; // The origin relate to the origin of picture itself

      origin.left = imgOffset.x.min - frameOffset.x.min < 0 ? Math.abs(imgOffset.x.min - frameOffset.x.min) : 0;
      origin.top = imgOffset.y.min - frameOffset.y.min < 0 ? Math.abs(imgOffset.y.min - frameOffset.y.min) : 0; // if img height bigger than frame and directly above the frame
      // final area height should be minus this part

      var bottomGap = imgOffset.y.max - frameOffset.y.max;
      var rightGap = imgOffset.x.max - frameOffset.x.max;

      if (bottomGap > 0) {
        // img height bigger than frame height
        extraBeyond.height = bottomGap;
      }

      if (rightGap > 0) {
        extraBeyond.width = rightGap;
      } // get final clip area width and height


      origin.width = imgOffset.width - Math.abs(origin.left) - extraBeyond.width;
      origin.height = imgOffset.height - Math.abs(origin.top) - extraBeyond.height; // post postive number

      origin.left = Math.abs(origin.left);
      origin.top = Math.abs(origin.top);
      return this.getRealOrigin(origin);
    }
  }, {
    key: "getRealOrigin",
    value: function getRealOrigin(origin) {
      // since img is enlarged by default
      // so need get scale to calculate original cut position and size
      var realScale = this.defaultScale * this.scale;
      Object.keys(origin).forEach(function (prop) {
        if (['relateFrameLeft', 'relateFrameTop'].includes(prop)) {
          return;
        }

        origin[prop] /= realScale; // origin[prop] = origin[prop] / realScale;
      });
      return origin;
    }
  }, {
    key: "fileToBase64",
    value: function fileToBase64(file) {
      return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = function () {
          resolve(reader.result);
        };

        reader.onerror = reject;
      });
    }
  }, {
    key: "clip",
    value: function () {
      var _clip = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(origin, img) {
        var canvas, ctx, backingStore, blob;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                canvas = document.createElement('canvas');
                canvas.width = this.frameEl.offsetWidth * this.devicePixelRatio;
                canvas.height = this.frameEl.offsetHeight * this.devicePixelRatio;
                canvas.style.background = '#000';
                canvas.style.width = "".concat(this.frameEl.offsetWidth, "px");
                canvas.style.height = "".concat(this.frameEl.offsetHeight, "px");
                canvas.style.position = 'fixed';
                ctx = canvas.getContext('2d');
                ctx.drawImage(img, origin.left, origin.top, origin.width, origin.height, origin.relateFrameLeft * this.devicePixelRatio, origin.relateFrameTop * this.devicePixelRatio, // show size in canvas
                origin.width * (this.defaultScale * this.scale * this.devicePixelRatio), origin.height * (this.defaultScale * this.scale * this.devicePixelRatio)); // document.body.appendChild(canvas);

                backingStore = ctx.backingStorePixelRatio || ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePxelRatio || ctx.oBackingStorePxelRatio;
                console.log('backingstore', backingStore);
                _context3.next = 13;
                return utils.canvasToBlob(canvas);

              case 13:
                blob = _context3.sent;
                this.download(blob);
                return _context3.abrupt("return", blob);

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function clip(_x, _x2) {
        return _clip.apply(this, arguments);
      }

      return clip;
    }()
  }, {
    key: "download",
    value: function () {
      var _download = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(blob) {
        var link;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'clipedImg.png';
                link.click();

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function download(_x3) {
        return _download.apply(this, arguments);
      }

      return download;
    }()
  }, {
    key: "previewImg",
    value: function previewImg(el, base64Str) {
      console.log('preview img', el, base64Str);
      if (!el) return;
      var that = this;
      el.style.display = 'none';

      el.onload = function () {
        el.originalSize = {
          width: this.width,
          height: this.height
        };
        var deviceWidth = window.innerWidth;
        var setImgWidth = that.options.imgWidth;

        if (setImgWidth.includes('vw')) {
          setImgWidth = deviceWidth * setImgWidth.replace('vw', '') / 100;
        } else {
          setImgWidth = setImgWidth.replace('px', '');
        }

        that.defaultScale = setImgWidth / this.width; // when begin show, adjust position to center for preview img

        var moveCenter = {
          x: (deviceWidth - setImgWidth) / 2,
          y: (that.boxEl.offsetHeight - this.height * that.defaultScale) / 2
        };
        that.data.finalLeft = moveCenter.x;
        that.data.finalTop = moveCenter.y;
        el.style.transform = utils.getTransformMatrix({
          scale: this.scale,
          translateX: moveCenter.x,
          translateY: moveCenter.y
        }); // set the best width to show it

        el.style.width = "".concat(setImgWidth, "px");
        el.style.display = 'block';
      };

      el.src = base64Str;
    }
  }, {
    key: "localImgHandle",
    value: function () {
      var _localImgHandle = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5() {
        var file, base64str, previewImgSrc;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                file = this.uploadEl.files[0];

                if (!file) {
                  _context5.next = 10;
                  break;
                }

                this.tapHooks('beforeImgLoad');
                _context5.next = 5;
                return this.fileToBase64(file);

              case 5:
                base64str = _context5.sent;
                previewImgSrc = ''; // Preferential use of object url to ensure performance

                if (window.URL.createObjectURL) {
                  // eslint-disable-next-line
                  this.previewObjectUrl = previewImgSrc = window.URL.createObjectURL(file);
                } else {
                  previewImgSrc = base64str;
                }

                this.previewImg(this.imgEl, previewImgSrc);
                this.tapHooks('beforeImgLoaded');

              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function localImgHandle() {
        return _localImgHandle.apply(this, arguments);
      }

      return localImgHandle;
    }()
  }]);

  return ImgClip;
}();

module.exports = ImgClip; // Allow use of default import syntax in Typescript

module.exports["default"] = ImgClip;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : undefined
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ }),
/* 4 */
/***/ (function(module, exports) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

function countTime(count, reject) {
  var timeout = count;
  var timer = setTimeout(function () {
    timeout--;

    if (timeout < 0) {
      reject();
      clearTimeout(timer);
    }
  }, timeout);
}

function isNumber(str) {
  return /^[0-9]+$/.test(str);
}

function wait(time) {
  return new Promise(function (resolve) {
    var timer = setTimeout(function () {
      clearTimeout(timer);
      resolve();
    }, time);
  });
}

function getTransformMatrix(matrixMember) {
  // eslint-disable-next-line
  var scale = matrixMember.scale,
      _matrixMember$scaleX = matrixMember.scaleX,
      scaleX = _matrixMember$scaleX === void 0 ? 1 : _matrixMember$scaleX,
      _matrixMember$scaleY = matrixMember.scaleY,
      scaleY = _matrixMember$scaleY === void 0 ? 1 : _matrixMember$scaleY,
      translateX = matrixMember.translateX,
      translateY = matrixMember.translateY;

  if (scale) {
    scaleX = scale;
    scaleY = scale;
  }

  return "matrix(".concat(scaleX, ", 0, 0, ").concat(scaleY, ", ").concat(translateX, ", ").concat(translateY, ")");
}

function getDistance(p1, p2) {
  var x = p2.x - p1.x;
  var y = p2.y - p1.y;
  return Math.sqrt(x * x + y * y);
}
/* eslint-disable */


function dataURLToBlob(dataURL) {
  var arr = dataURL.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], {
    type: mime
  });
}

function canvasToBlob(canvas) {
  return new Promise(function (resolve, reject) {
    if (!Blob) {
      reject('Feature Blob does not exist');
    } // compatible when feature of canvas.toBlob does not exist


    if (!HTMLCanvasElement.prototype.toBlob) {
      Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
        value: function value(calback, type, quality) {
          var binStr = atob(this.toDataURL(type, quality)).split(',')[1],
              len = binStr.length,
              arr = new Uint8Array(len);

          for (var i = 0; i < len; i++) {
            arr[i] = binStr.charCodeAt(i);
          }

          callback(new Blob([arr], {
            type: type || 'image/png'
          }));
        }
      });
    }

    canvas.toBlob(resolve, 'image/png');
  });
}

module.exports = {
  isNumber: isNumber,
  countTime: countTime,
  wait: wait,
  getTransformMatrix: getTransformMatrix,
  getDistance: getDistance,
  dataURLToBlob: dataURLToBlob,
  canvasToBlob: canvasToBlob
};

/***/ })
/******/ ]);
});