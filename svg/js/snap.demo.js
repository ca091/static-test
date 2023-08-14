//GreenSock
//SVG.js
//Velocity.js
//Snap.svg
//bonsai.js


function init() {
  var s = Snap('#svg')
  var bigCircle = s.circle(150, 150, 100)
  bigCircle.attr({
    fill: 'orange',
    stroke: 'green',
    strokeWidth: 5,
  })
  var smallCircle = s.circle(100, 150, 70)
  var gs = s.group(smallCircle, s.circle(200, 150, 70))
  gs.attr({
    fill: '#fff',
  })
  bigCircle.attr({
    mask: gs,
  })
  //ani
  smallCircle.animate({r: 50}, 1000)
  gs.select('circle:nth-child(2)').animate({r: 50}, 1000)
  //pattern
  var p = s.path('M10-5-10,15M15,0,0,15M0-5-20,15').attr({
    fill: 'none',
    stroke: '#bada55',
    strokeWidth: 5,
  })
  p = p.pattern(0, 0, 10, 10)
  bigCircle.attr({
    fill: p,
  })

  gs.attr({
    fill: 'r()#fff-#000',
  })

  gs.attr({
    fill: 'R(150,150,100)#fff-#000',
  })
  p.select('path').animate({stroke: '#f00'}, 1000, mina.backout, function () {
    console.log('path ani over')
  })

  //svg 元素对象 的获取
  var line1 = s.select('#g-line')
  line1.animate({y2: '500'}, 1000, mina.bounce, function () {
    console.log('line change y2 over')
  })


  //circle animation by stroke-offset
  var circle1 = s.select('#g-p-circle')
  //获取path长度
  var c1 = document.getElementById('g-p-circle')
  var circleLength = c1.getTotalLength()
  var deg = 90
  var offset = (360 - deg) / 360 * circleLength
  circle1.animate({
    strokeDashoffset: offset,
  }, 1000)
  //c1.style.strokeDashoffset = circleLength;

  var anipolygon = s.select('#ani-polygon')
  //anipolygon['node'].classList.add('ani-polygon');
  anipolygon.animate({
    fill: '#53B848',
    //points: "110,58.2 147.3,0 192.1,29 141.7,105.1 118.7,139.8 88.8,185.1 46.1,156.5 0,125 23.5,86.6 71.1,116.7"
  }, 1000)
  //Snap.animate(200, 0, function(){
  //	anipolygon.attr({
  //		points: "110,58.2 147.3,0 192.1,29 141.7,105.1 118.7,139.8 88.8,185.1 46.1,156.5 0,125 23.5,86.6 71.1,116.7"
  //	});
  //}, 2000, mina.backout);


}

window.onload = init
