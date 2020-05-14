const utils = require('./utils');

class ImgClip {
  /**
   * @param {*} els element collect, frameEl、imgEl、uploadEl of button、top operatAble box
   * @param {*} options
   * @param {*} hooks
   */
  constructor(els, options = {}, hooks = {}) {
    const { uploadEl, imgEl, boxEl, frameEl } = els;
    this.uploadEl = uploadEl;
    this.imgEl = imgEl;
    this.boxEl = boxEl;
    this.frameEl = frameEl;
    this.options = options;
    this.hooks = hooks;
    this.init();
  }

  init() {
    this.registerListener();
    this.data = {
      finalLeft: 0,
      finalTop: 0,
    };
    this.events = {
      touchstartEv: {},
    };
    this.scaleConvertRatio = 400 / 0.1;
    this.defaultScale = 1;
    this.scale = 1;
    // when final scale bigger than this value
    // then use this value
    this.options.biggestScale = 2;
    // when final scale smaller than this value
    // then use this value
    this.options.minimalScale = 0.1;
    this.options.singleBiggestScale = 0.3;
    // limit zoom out ratio
    this.devicePixelRatio = window.devicePixelRatio > 3 && 3
      || window.devicePixelRatio
      || 1;
  }

  registerListener() {
    this.uploadEl.onchange = this.localImgHandle.bind(this);
    this.boxEl.addEventListener('touchstart', (e) => {
      this.events.touchstartEv = e.touches[0];
      const isTwoFingersTouch = e.touches.length === 2;
      if (isTwoFingersTouch) {
        if (!this.options.scaleEnable) return;
        this.touchStartDistance = utils.getDistance(
          { x: e.touches[0].pageX, y: e.touches[0].pageY },
          { x: e.touches[1].pageX, y: e.touches[1].pageY },
        );
      }
      // begin judge single or double point
      if (!this.isInImgArea(this.events.touchstartEv)) {
        this.dragable = false;
      }
    });
    this.boxEl.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (e.touches.length >= 2) {
        if (!this.options.scaleEnable) return;
        // operate double
        this.twoFingersScale(e);
      } else {
        // operate single
        if (requestAnimationFrame) {
          requestAnimationFrame(this.dragging.bind(this, e));
        } else {
          this.dragging(e);
        }
      }
    });
    this.boxEl.addEventListener('touchend', () => {
      // reset dragable
      this.dragable = true;
    });
  }

  async destory() {
    // clear old upload input file
    await utils.wait(1000);
    this.uploadEl.value = '';
    this.imgEl.src = '';
    this.data = {
      finalLeft: 0,
      finalTop: 0,
    };
    this.imgEl.style.transform = utils.getTransformMatrix({
      scale: 1,
      translateX: 0,
      translateY: 0,
    });
    // release preview img object url RAM
    // eslint-disable-next-line
    this.previewObjectUrl && window.URL.revokeObjectURL(this.previewObjectUrl);
  }

  tapHooks(type, data) {
    if (this.hooks[type]) {
      this.hooks[type](data);
    }
  }

  dragging(e) {
    if (this.dragable === false) {
      return;
    }
    const { touchstartEv } = this.events;
    const touchend = e.touches[0];
    const moveX = touchend.pageX - touchstartEv.pageX;
    const moveY = touchend.pageY - touchstartEv.pageY;
    this.data.finalLeft += moveX;
    this.data.finalTop += moveY;
    this.imgEl.style.transform = utils.getTransformMatrix({
      scale: this.scale,
      translateX: this.data.finalLeft,
      translateY: this.data.finalTop,
    });
    this.events.touchstartEv = touchend;
  }

  twoFingersScale(e) {
    const touchOne = e.touches[0];
    const touchTwo = e.touches[1];
    const distance = utils.getDistance(
      { x: touchOne.pageX, y: touchOne.pageY },
      { x: touchTwo.pageX, y: touchTwo.pageY },
    );
    const scale = this.distanceToScale(distance);
    this.scale = this.getFinalScale(scale);
    this.imgEl.style.transform = utils.getTransformMatrix({
      scale: this.scale,
      translateX: this.data.finalLeft,
      translateY: this.data.finalTop,
    });
    console.log('two fingers touch', distance, scale, this.scale);
  }

  getFinalScale(scale) {
    const { minimalScale, biggestScale } = this.options;
    let finalScale;
    finalScale = this.scale * scale;
    finalScale = (finalScale < minimalScale && minimalScale)
      || (finalScale > biggestScale && biggestScale)
      || finalScale;
    return finalScale;
  }

  distanceToScale(distance) {
    const moveDistance = distance - this.touchStartDistance;
    const scale = moveDistance / this.scaleConvertRatio;
    const limitScale = Math.abs(scale) > this.options.singleBiggestScale
      && this.options.singleBiggestScale || Math.abs(scale);
    return scale > 0
      ? limitScale
      : Number(`-${limitScale}`);
  }

  isInImgArea(e) {
    // x < e.x < x + w
    // y < e.y < y + h
    const imgOffset = this.getOffset(this.imgEl);
    const { pageX: pointX, pageY: pointY } = e;
    // fn of console will spend 113 ms in CPU 6x slowdown
    // console.log('is in img area', pointX, pointY, imgOffset.x, imgOffset.y);
    if (
      (pointX > imgOffset.x.min && pointX < imgOffset.x.max)
      && (pointY > imgOffset.y.min && pointY < imgOffset.y.max)
    ) {
      return true;
    }
    return false;
  }

  getOffset(el) {
    const range = {
      x: {},
      y: {},
    };
    if (el.getBoundingClientRect) {
      const positions = el.getBoundingClientRect();
      range.x = {
        // two left edge
        // browser of uc positions.x will return udefined
        // so need instead of postions.left
        min: positions.left,
        // two right edge
        max: positions.left + positions.width,
      };
      range.y = {
        min: positions.top,
        max: positions.top + positions.height,
      };
      range.width = positions.width;
      range.height = positions.height;
    } else {
      // compatible the feature of el.getBoundingClientRect does not exist
    }
    return range;
  }

  async getClipImgArea(outputType = 'blob', formDataOptions = {}) {
    // get clip img area, then clipping
    // computed left top point's position in img
    const imgOffset = this.getOffset(this.imgEl);
    // if document height > 100 vh, frameEl.y.min will smaller than real value
    // but under actual conditions, the document height must be 100vh
    // because user has seted body height as 100vh
    const frameOffset = this.getOffset(this.frameEl);
    // the origin point is left top point
    const origin = this.computedOrigin(imgOffset, frameOffset);
    console.log('origin', origin);
    const blob = await this.clip(origin, this.imgEl);
    if (
      this.hooks.afterClip
      && this.hooks.afterClip.params
      && this.hooks.afterClip.params.type === 'formData'
    ) {
      this.tapHooks('afterClip', this.createFormData(blob, formDataOptions));
    } else {
      this.tapHooks('afterClip', blob);
    }
    this.destory();
    if (outputType === 'formData') {
      return this.createFormData(blob, formDataOptions);
    }
    return blob;
  }

  createFormData(blob, options = {}) {
    // return img stream
    const formData = new FormData();
    formData.append(
      'file',
      blob,
    );
    // eslint-disable-next-line
    for (let prop in options) {
      // eslint-disable-next-line
      if (options.hasOwnProperty(prop)) {
        // upload extra params
        formData.append(prop, options[prop]);
      }
    }
    return formData;
  }

  computedOrigin(imgOffset, frameOffset) {
    // computed bonding area between picture and photo frame
    const origin = {};
    const extraBeyond = {
      width: 0,
      height: 0,
    };
    // The origin of the picture placed in the canvas
    origin.relateFrameLeft = imgOffset.x.min - frameOffset.x.min > 0
      ? imgOffset.x.min - frameOffset.x.min
      : 0;
    origin.relateFrameTop = imgOffset.y.min - frameOffset.y.min > 0
      ? imgOffset.y.min - frameOffset.y.min
      : 0;
    // The origin relate to the origin of picture itself
    origin.left = imgOffset.x.min - frameOffset.x.min < 0
      ? Math.abs(imgOffset.x.min - frameOffset.x.min)
      : 0;
    origin.top = imgOffset.y.min - frameOffset.y.min < 0
      ? Math.abs(imgOffset.y.min - frameOffset.y.min)
      : 0;
    // if img height bigger than frame and directly above the frame
    // final area height should be minus this part
    const bottomGap = imgOffset.y.max - frameOffset.y.max;
    const rightGap = imgOffset.x.max - frameOffset.x.max;
    if (bottomGap > 0) {
      // img height bigger than frame height
      extraBeyond.height = bottomGap;
    }
    if (rightGap > 0) {
      extraBeyond.width = rightGap;
    }
    // get final clip area width and height
    origin.width = imgOffset.width - Math.abs(origin.left) - extraBeyond.width;
    origin.height = imgOffset.height - Math.abs(origin.top) - extraBeyond.height;
    // post postive number
    origin.left = Math.abs(origin.left);
    origin.top = Math.abs(origin.top);
    return this.getRealOrigin(origin);
  }

  getRealOrigin(origin) {
    // since img is enlarged by default
    // so need get scale to calculate original cut position and size
    const realScale = this.defaultScale * this.scale;
    Object.keys(origin).forEach((prop) => {
      if (['relateFrameLeft', 'relateFrameTop'].includes(prop)) {
        return;
      }
      origin[prop] /= realScale;
      // origin[prop] = origin[prop] / realScale;
    });
    return origin;
  }

  fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
    });
  }

  async clip(origin, img) {
    const canvas = document.createElement('canvas');
    canvas.width = this.frameEl.offsetWidth * this.devicePixelRatio;
    canvas.height = this.frameEl.offsetHeight * this.devicePixelRatio;
    canvas.style.background = '#000';
    canvas.style.width = `${this.frameEl.offsetWidth}px`;
    canvas.style.height = `${this.frameEl.offsetHeight}px`;
    canvas.style.position = 'fixed';
    const ctx = canvas.getContext('2d');
    ctx.drawImage(
      img,
      origin.left,
      origin.top,
      origin.width,
      origin.height,
      origin.relateFrameLeft * this.devicePixelRatio,
      origin.relateFrameTop * this.devicePixelRatio,
      // show size in canvas
      origin.width * (this.defaultScale * this.scale * this.devicePixelRatio),
      origin.height * (this.defaultScale * this.scale * this.devicePixelRatio),
    );

    // document.body.appendChild(canvas);
    const backingStore = ctx.backingStorePixelRatio
      || ctx.webkitBackingStorePixelRatio
      || ctx.mozBackingStorePixelRatio
      || ctx.msBackingStorePxelRatio
      || ctx.oBackingStorePxelRatio;
    console.log('backingstore', backingStore);
    const blob = await utils.canvasToBlob(canvas);
    this.download(blob);
    return blob;
  }

  async download(blob) {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'clipedImg.png';
    link.click();
  }

  previewImg(el, base64Str) {
    console.log('preview img', el, base64Str);
    if (!el) return;
    const that = this;
    el.style.display = 'none';
    el.onload = function () {
      el.originalSize = {
        width: this.width,
        height: this.height,
      };
      const deviceWidth = window.innerWidth;
      let setImgWidth = that.options.imgWidth;
      if (setImgWidth.includes('vw')) {
        setImgWidth = deviceWidth * setImgWidth.replace('vw', '') / 100;
      } else {
        setImgWidth = setImgWidth.replace('px', '');
      }
      that.defaultScale = setImgWidth / this.width;
      // when begin show, adjust position to center for preview img
      const moveCenter = {
        x: (deviceWidth - setImgWidth) / 2,
        y: (that.boxEl.offsetHeight - this.height * that.defaultScale) / 2,
      };
      that.data.finalLeft = moveCenter.x;
      that.data.finalTop = moveCenter.y;
      el.style.transform = utils.getTransformMatrix({
        scale: this.scale,
        translateX: moveCenter.x,
        translateY: moveCenter.y,
      });
      // set the best width to show it
      el.style.width = `${setImgWidth}px`;
      el.style.display = 'block';
    };
    el.src = base64Str;
  }

  async localImgHandle() {
    const file = this.uploadEl.files[0];
    if (file) {
      this.tapHooks('beforeImgLoad');
      const base64str = await this.fileToBase64(file);
      let previewImgSrc = '';
      // Preferential use of object url to ensure performance
      if (window.URL.createObjectURL) {
        // eslint-disable-next-line
        this.previewObjectUrl = previewImgSrc = window.URL.createObjectURL(file);
      } else {
        previewImgSrc = base64str;
      }
      this.previewImg(this.imgEl, previewImgSrc);
      this.tapHooks('beforeImgLoaded');
    }
  }
}

module.exports = ImgClip;

// Allow use of default import syntax in Typescript
module.exports.default = ImgClip;
