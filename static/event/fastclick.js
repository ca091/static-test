const fastclick = {
  touchendTime: 0,
  isAllowed: false, // 是否允许触发默认事件
  init() {
    // 过时
    // this.customMouseEvents = document.createEvent('MouseEvents')
    // this.customMouseEvents.initEvent('click', true, true)
    this.customMouseEvents = new CustomEvent('click', {bubbles: true, cancelable: true})
    this.handler = this.handleTouchEnd.bind(this)
  },
  handleTouchEnd(e) {
    // 触发自定义事件，这里可以触发click事件
    this.touchendTime = Date.now()
    if (!this.isAllowed) {
      e.target.dispatchEvent(this.customMouseEvents)
      // 阻止click事件触发
      e.preventDefault()
    }
  },
  attach(element) {
    this.init()
    element.addEventListener('touchend', this.handler)
  },
  detach(element) {
    element.removeEventListener('touchend', this.handler)
  },
  allowedEventPass(bool = true) {
    this.isAllowed = bool
  },
}
