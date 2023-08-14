;(function (g) {
  var E = {
    addEvent: function (ele, type, handler) {
      if (ele.addEventListener) {
        ele.addEventListener(type, handler, false)
      } else if (ele.attachEvent) {
        ele.attachEvent(['on', type].join(''), handler)
      } else {
        ele[['on', type].join('')] = handler
      }
    },
    killEvent: function (ele, type, handler) {
      if (ele.removeEventListener) {
        ele.removeEventListener(type, handler, false)
      } else if (ele.attachEvent) {
        ele.detachEvent(['on', type].join(''), handler)
      } else {
        ele[['on', type].join('')] = null
      }
    },
    preventDefault: function (e) {
      if (e.preventDefault) {
        e.preventDefault()
      } else {
        e.returnValue = false
      }
    },
    stopPropagation: function (e) {
      if (e.stopPropagation) {
        e.stopPropagation()
      } else {
        e.cancelBubble = true
      }
    },
    getTag: function (e) {
      return e.target || e.srcElement
    },
    getEvent: function (e) {
      return e || window.event
    },
  }

  const proto_event = function () {
    //ie9 +
    HTMLElement.prototype.on = function (type, handler) {
      if (this.addEventListener) {
        this.addEventListener(type, handler, false)
      } else if (this.attachEvent) {
        var tag = this
        tag.attachEvent(['on', type].join(''), function () {
          handler.apply(tag, arguments)
        })
      }
    }
    HTMLElement.prototype.off = function (type, handler) {
      if (this.addEventListener) {
        this.removeEventListener(type, handler, false)
      } else if (this.attachEvent) {
        var tag = this
        tag.detachEvent(['on', type].join(''), handler)
      }
    }
    HTMLElement.prototype.one = function (type, handler) {
      if (this.addEventListener) {
        this.addEventListener(type, function () {
          handler.apply(this, arguments)
          this.removeEventListener(type, handler, false)
        }, false)
      } else if (this.attachEvent) {
        var tag = this
        tag.detachEvent(['on', type].join(''), handler)
      }
    }
  }

  if (typeof define === 'function' && define.amd) {
    define(E) //Amd
  } else if (typeof exports === 'object') {
    module.exports = E // CommonJS
  } else {
    g.E = E //Globle
  }
})(window)
