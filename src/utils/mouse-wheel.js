let prefix = ''
let _addEventListener
let support

if (window.addEventListener) {
  _addEventListener = 'addEventListener'
} else {
  _addEventListener = 'attachEvent'
  prefix = 'on'
}
if (document.onmousewheel !== undefined) {
  support = 'mousewheel'
}
try {
  WheelEvent('wheel')
  support = 'wheel'
} catch (e) {
}
if (!support) {
  support = 'DOMMouseScroll'
}

let _addWheelListener = (elem, eventName, callback, useCapture = false) => {
  elem[_addEventListener](prefix + eventName, support === 'wheel' ? callback : function (originalEvent) {
    !originalEvent && (originalEvent = window.event)
    let event = {
      originalEvent: originalEvent,
      target: originalEvent.target || originalEvent.srcElement,
      type: 'wheel',
      deltaMode: originalEvent.type === 'MozMousePixelScroll' ? 0 : 1,
      deltaX: 0,
      delatZ: 0,
      preventDefault: function () {
        originalEvent.preventDefault ? originalEvent.preventDefault() : originalEvent.returnValue = false
      }
    }
    if (support === 'mousewheel') {
      event.deltaY = -1 / 40 * originalEvent.wheelDelta
      originalEvent.wheelDeltaX && (event.deltaX = -1 / 40 * originalEvent.wheelDeltaX)
    } else {
      event.deltaY = originalEvent.detail
    }
    originalEvent.preventDefault ? originalEvent.preventDefault() : (originalEvent.returnValue = false)
    return callback(event)
  }, useCapture)
}

/**
 * 鼠标滚轮事件绑定
 * @param el dom target
 * @param callback 回调函数
 * @param useCapture 是否捕获阶段
 */
export default function mouseWheelBind (el, callback, useCapture = false) {
  let fn = callback.bind(el)
  if (support === 'DOMMouseScroll') {
    _addWheelListener(el, 'MozMousePixelScroll', fn, useCapture)
  } else {
    _addWheelListener(el, support, fn, useCapture)
  }
};
