// AMD  规范 需要 define
define(function () {
  function Rectangle(w, h) {
    this.w = typeof w == 'number' ? w : 100
    this.h = typeof h == 'number' ? h : 100
  }

  Rectangle.prototype = {
    getC: function () {
      return (this.w + this.h) * 2
    },
    getS: function () {
      return this.w * this.h
    },
  }
  Rectangle.getInstance = function (w, h) {
    return new Rectangle(w, h)
  }

  console.log('load rect.js...')
  return Rectangle
})
