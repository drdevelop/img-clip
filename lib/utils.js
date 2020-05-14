function countTime(count, reject) {
  let timeout = count;
  const timer = setTimeout(() => {
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
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      resolve();
    }, time);
  });
}

function getTransformMatrix(matrixMember) {
  // eslint-disable-next-line
  let { scale, scaleX = 1, scaleY = 1, translateX, translateY } = matrixMember;
  if (scale) {
    scaleX = scale;
    scaleY = scale;
  }
  return `matrix(${scaleX}, 0, 0, ${scaleY}, ${translateX}, ${translateY})`;
}

function getDistance(p1, p2) {
  const x = p2.x - p1.x;
  const y = p2.y - p1.y;
  return Math.sqrt(x * x + y * y);
}
/* eslint-disable */
function dataURLToBlob(dataURL) {
  let arr = dataURL.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {
    type: mime,
  });
}

function canvasToBlob(canvas) {
  return new Promise((resolve, reject) => {
    if (!Blob) {
      reject('Feature Blob does not exist');
    }
    // compatible when feature of canvas.toBlob does not exist
    if (!HTMLCanvasElement.prototype.toBlob) {
      Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
        value: function (calback, type, quality) {
          let binStr = atob(this.toDataURL(type, quality)).split(',')[1],
            len = binStr.length,
            arr = new Uint8Array(len);
          for (let i = 0; i < len; i++) {
            arr[i] = binStr.charCodeAt(i);
          }
          callback(new Blob([arr], { type: type || 'image/png'}));
        }
      });
    }
    canvas.toBlob(resolve, 'image/png');
  });
}

module.exports = {
  isNumber,
  countTime,
  wait,
  getTransformMatrix,
  getDistance,
  dataURLToBlob,
  canvasToBlob,
};
