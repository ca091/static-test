class Popup {
  constructor({mask = 'mask', clear = true}) {
    this.mask = typeof mask === 'string' ? document.querySelector(mask) : mask
    if (!this.mask) this.setMask()
    else this.mask.style.display = 'none'
    this.activeEl = null
    if (clear) {
      this.mask.addEventListener('click', () => {
        if (this.activeEl) this.moveOut(this.activeEl)
      })
    }
  }

  moveIn(el) {
    let dom = typeof el === 'string' ? document.querySelector(el) : el
    if (!(dom instanceof HTMLElement)) throw new Error('未选择正确的dom节点, fn: moveIn(el)')
    if (dom.dataset.in === '1') return
    dom.dataset.in = '1'
    let direction = dom.dataset.direction
    if (!direction) dom.dataset.direction = direction = Popup.getDirection(getComputedStyle(dom).transform)
    switch (direction) {
      case 'top':
      case 'bottom':
        dom.style.transform = 'translateY(0)'
        break
      case 'left':
      case 'right':
        dom.style.transform = 'translateX(0)'
        break
      default:
        console.warn('error direction')
    }
    this.activeEl = dom
    this.mask.style.display = 'block'
  }

  moveOut(el) {
    let dom = typeof el === 'string' ? document.querySelector(el) : el
    if (!(dom instanceof HTMLElement)) throw new Error('未选择正确的dom节点, fn: moveOut(el)')
    if (dom.dataset.in === '0') return
    dom.dataset.in = '0'
    let direction = dom.dataset.direction
    switch (direction) {
      case 'top':
        dom.style.transform = 'translateY(-100%)'
        break
      case 'right':
        dom.style.transform = 'translateX(100%)'
        break
      case 'bottom':
        dom.style.transform = 'translateY(100%)'
        break
      case 'left':
        dom.style.transform = 'translateX(-100%)'
        break
      default:
        console.warn('error direction')
    }
    this.activeEl = null
    this.mask.style.display = 'none'
  }

  setMask() {
    let el_mask = document.createElement('div')
    el_mask.className = 'mask pop-mask'
    el_mask.style.display = 'none'
    document.body.appendChild(el_mask)
    this.mask = el_mask
  }

  /**
   * ⬆️ matrix(1, 0, 0, 1, 0, -400)
   * ➡️ matrix(1, 0, 0, 1, 300, 0)
   * ⬇️ matrix(1, 0, 0, 1, 0, 400)
   * ⬅️ matrix(1, 0, 0, 1, -300, 0)
   * @param matrix
   */
  static getDirection(matrix) {
    let re
    matrix.replace(/^matrix\((\d+), (\d+), (\d+), (\d+), (-?\d+), (-?\d+)\)$/, (match, p1, p2, p3, p4, p5, p6) => {
      if (+p5 === 0 && +p6 === 0) re = 'center'
      else if (+p5 === 0) {
        if (+p6 < 0) re = 'top'
        else re = 'bottom'
      } else if (+p6 === 0) {
        if (+p5 < 0) re = 'left'
        else re = 'right'
      }
    })
    return re
  }
}
