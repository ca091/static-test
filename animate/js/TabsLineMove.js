class TabsLineMove {
  constructor({el = '.tab', items = '.tab-item', height, color}) {
    this.tab = typeof el === 'string' ? document.querySelector(el) : el
    this.items = typeof items === 'string' ? this.tab.querySelectorAll(items) : items
    this.height = height
    this.color = color
    this.activeIndex = 0
    this.setBarDom()
    this.setBarLayout(this.activeIndex)
    this.addEvent()
  }

  setBarDom() {
    let el = document.createElement('div')
    el.className = 'tab-bar'
    if (this.height) el.style.height = this.height + 'px'
    if (this.color) el.style.backgroundColor = this.color
    this.tab.appendChild(el)
    this.bar = el
  }

  setBarLayout(index) {
    let lr = this.getLeftRight(index)
    this.bar.style.left = lr.left + '%'
    this.bar.style.right = lr.right + '%'
  }

  addEvent() {
    [...this.items].forEach((item, index) => {
      item.dataset.id = index + ''
      item.addEventListener('click', e => {
        this.moveTo(e.currentTarget.dataset.id)
      })
    })
    this.bar.addEventListener('transitionend', () => {
      this.bar.className = this.bar.className.replace(/\s*tab-bar-(for|back)ward/, '')
      this.items[this.activeIndex].className = this.items[this.activeIndex].className + ' active'
    })
  }

  moveTo(index) {
    if (this.activeIndex === index) return
    // 取消active
    this.items[this.activeIndex].className = this.items[this.activeIndex].className.replace(/\s*active/, '')
    // 设置bar的transition
    this.bar.className = `${this.bar.className} tab-bar-${this.activeIndex < index ? 'forward' : 'backward'}`
    // 设置bar的样式
    this.setBarLayout(index)
    this.activeIndex = index
  }

  getLeftRight(index) {
    return {
      left: (+index / this.items.length * 100).toFixed(3),
      right: ((this.items.length - 1 - +index) / this.items.length * 100).toFixed(3),
    }
  }
}
