const cursor = 'col-resize' // e-resize
let el_aside = document.querySelector('aside')
let x = 0
let asideWidth = el_aside.clientWidth
let minWidth = el_aside.clientWidth
let isMouseDown = false

document.body.addEventListener('mousemove', throttle(e => {
  //处理移动
  if (isMouseDown) {
    el_aside.style.cursor = cursor
    let move = e.clientX - x
    let re = asideWidth + move < minWidth ? minWidth : asideWidth + move
    el_aside.style.width = re + 'px'
  }
}, 30))

el_aside.addEventListener('mousemove', throttle(e => {
  //处理光标样式
  if (e.clientX >= asideWidth - 1) {
    e.currentTarget.style.cursor = cursor
  } else {
    e.currentTarget.style.cursor = 'default'
  }
}, 50))

el_aside.addEventListener('mousedown', e => {
  if (e.clientX >= 199) {
    isMouseDown = true
    x = e.clientX
  }
})

document.body.addEventListener('mouseup', e => {
  isMouseDown = false
  asideWidth = el_aside.clientWidth
})
