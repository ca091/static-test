function init() {
  let canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d')

  //渐变
  ctx.rect(0, 0, canvas.width, canvas.height)//生成渐变区域
  let lg = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
  lg.addColorStop(0, '#333')
  lg.addColorStop(1, '#777')
  ctx.fillStyle = lg
  ctx.fill()

  //设置笔触 --> stroke绘制
  let lineWidth = 10, strokeStyle = 'orange', lineCap = 'round', lineJoin = 'bevel'
  let fillStyle = '#dd4814'
  ctx.beginPath()
  ctx.lineWidth = lineWidth
  ctx.strokeStyle = strokeStyle
  ctx.lineCap = lineCap
  ctx.lineJoin = lineJoin
  ctx.moveTo(10, 10)
  ctx.lineTo(111, 111)
  ctx.stroke()

  //圆
  ctx.beginPath()
  ctx.arc(111, 111, 100, 0.5 * Math.PI, 1.5 * Math.PI, false)
  ctx.stroke()

  //二次曲线
  ctx.beginPath()
  ctx.moveTo(300, 200)
  ctx.quadraticCurveTo(400, 10, 500, 200)
  ctx.stroke()

  //贝瑟尔曲线
  ctx.beginPath()
  ctx.moveTo(188, 130)
  ctx.bezierCurveTo(140, 10, 388, 10, 388, 170)
  ctx.stroke()

  //路径
  ctx.beginPath()
  ctx.moveTo(10, 10)
  ctx.lineTo(70, 10)
  ctx.quadraticCurveTo(130, 60, 200, 30)
  ctx.bezierCurveTo(180, 50, 300, 300, 400, 300)
  ctx.stroke()

  ctx.closePath()

  //矩形
  ctx.beginPath()
  //迳向渐变填充
  let rg = ctx.createRadialGradient(650, 110, 1, 600, 110, 200)
  rg.addColorStop(0, 'orange')
  rg.addColorStop(1, '#dd4814')
  ctx.rect(500, 10, 300, 200)
  ctx.fillStyle = rg
  ctx.fill()

  //图案填充
  ctx.beginPath()
  let imgObj = new Image()
  imgObj.onload = function () {
    let pattern = ctx.createPattern(imgObj, 'repeat')
    ctx.rect(0, 300, 400, 300)
    ctx.fillStyle = pattern
    ctx.fill()
  }
  imgObj.src = 'img/c.png'

  //绘制图片
  let img2 = new Image()
  img2.onload = function () {
    ctx.drawImage(img2, 420, 300, 300, 200)//left,top[,w,h]
  }
  img2.src = 'img/q.png'

  //图片裁切
  //drawImage(
  //	imgobj,
  //	sx, //相对于图片自身的裁减左边距离
  //	sy, //相对于图片自身的裁减顶端距离
  //	sw, //裁减图片宽度
  //	sh, //裁减图片高度
  //	dx, //图片裁减后相对于画布的左端距离
  //	dy, //图片裁减后相对于画布的顶端距离
  //	dw, //图片裁减后设置宽度
  //	dy  //图片裁减后设置高度
  //)
  let img3 = new Image()
  img3.onload = function () {
    ctx.drawImage(img3, 10, 10, 300, 200, 0, 640, 400, 300)
  }
  img3.src = 'img/clip.png'

  //字体
  ctx.font = 'bold 32pt "microsoft yahei" '
  ctx.fillText('你好,xxx', 400, 700)
}

window.onload = init
