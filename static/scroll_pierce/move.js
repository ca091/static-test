function getPrefix() {
  var _elementStyle = document.createElement('div').style
  var vendors = ['msT', 'MozT', 'webkitT', 't'],
    transform,
    i = 0,
    l = vendors.length
  for (; i < l; i++) {
    transform = vendors[i] + 'ransform'
    if (transform in _elementStyle) return vendors[i].substr(0, vendors[i].length - 1)
  }
  return false
}

var prefix = getPrefix()

function Scroll(opts) {
  this.scrollElem = opts.scrollElem,
    this.scrollCon = opts.scrollCon,
    this.scrollwp = opts.scrollwp,
    this.CH = opts.scrollCon.offsetHeight - opts.scrollwp.offsetHeight,
    this.moveDis = 0
  this.init()
}

Scroll.prototype = {
  constructor: 'Scroll',
  tweenmove: function (dis) {
    var self = this
    self.scrollCon.style.cssText = '-' + prefix + '-transform:translateY(' + dis + 'px) translateZ(0);-' + prefix + '-transition:-' + prefix + '-transform 0.2s linear'
  },
  move: function (dis) {
    var self = this
    self.scrollCon.style.cssText = '-' + prefix + '-transform:translateY(' + dis + 'px) translateZ(0)'
  },
  init: function () {
    var _this = this, moveY, touchY
    _this.scrollElem.addEventListener('touchstart', function (e) {
      e.preventDefault()
      // var e = e || window.event;
      var touch = e.touches[0]
      touchY = touch.clientY
    }, false)
    _this.scrollElem.addEventListener('touchmove', function (e) {
      e.preventDefault()
      // var e = e || window.event;
      var touch = e.touches[0]
      moveY = touch.clientY
      if (moveY - touchY + _this.moveDis < 20 && moveY - touchY + _this.moveDis > (-_this.CH - 20)) {
        _this.move(moveY - touchY + _this.moveDis)
      }
    }, false)
    _this.scrollElem.addEventListener('touchend', function (e) {
      _this.moveDis = moveY - touchY + _this.moveDis
      if (_this.moveDis >= 0) {
        _this.tweenmove(0)
        _this.moveDis = 0
      } else if (_this.moveDis <= -_this.CH) {
        _this.tweenmove(-_this.CH)
        _this.moveDis = -_this.CH
      }
    }, false)
  },
}
window.Scroll = Scroll
