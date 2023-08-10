;(function (g) {
  var C = {}

  if (typeof define === 'function' && define.amd) {
    define(C) // Amd
  } else if (typeof exports === 'object') {
    module.exports = C // CommonJS
  } else {
    g.C = C // Globle
  }
})(window)
