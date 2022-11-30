;(function () {
  var t1 = $('#t1'), notify = $('p.notify'), ball = $('.ball'), shadow = $('.shadow')

  //easing.js
  t1.animate({
    top: '+=500px',
  }, 1000, 'bounceout', function () {
    notify.html('this is bounceout timingfunc')
  })

  //requestAnimationFrame + tween.js
  var objBall = {}
  var shadowWithBall = function (top) {
    // 0 ~ 500
    var top = top || parseInt(ball.css('top')),
      scale = 1 + (500 - top) / 300,
      opacity = 1 - (500 - top) / 300
    if (opacity < 0) opacity = 0
    shadow.css('opacity', opacity)
      .css('WebkitTransform', 'scale(' + [scale, scale].join(',') + ')')
      .css('transform', 'scale(' + [scale, scale].join(',') + ')')
  }, funFall = function () {
    var start = 0, during = 100
    var _run = function () {
      start++
      var top = Tween.Bounce.easeOut(start, objBall.top, 500 - objBall.top, during)
      ball.css('top', top)
      shadowWithBall(top)
      if (start < during) requestAnimationFrame(_run)
    }
    _run()
  }

  ball.on('mousedown touchstart', function (event) {
    if (event.type === 'touchstart') {
      event.preventDefault()
      objBall.pageY = event.originalEvent.touches[0].pageY
    } else {
      objBall.pageY = event.pageY
    }
    objBall.flagFollow = true
  })

  $(document).on('mousemove touchmove', function (event) {
    var pageY
    if (event.type === 'touchmove') {
      pageY = event.originalEvent.touches[0].pageY
    } else {
      pageY = event.pageY
    }
    if (objBall.flagFollow) {
      objBall.top = 500 - (objBall.pageY - pageY)
      if (objBall.top < 0) {
        objBall.top = 0
      } else if (objBall.top > 500) {
        objBall.top = 500
      }
      //cosnole.log(objBall.top);
      ball.css('top', objBall.top)
      shadowWithBall(objBall.top)
    }
  })

  $(document).on('mouseup touchend', function () {
    if (objBall.flagFollow) funFall()
    objBall.flagFollow = false
  })

  //滚动条
  function scrollTo(top) {
    $('html, body').animate({scrollTop: top}, 500)
  }

  $('.notify').on('click', function () {
    scrollTo(100)
  })

})()
