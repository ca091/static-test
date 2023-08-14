class AppDrawer extends HTMLElement {
  constructor() {
    super()
    this.addEventListener('click', e => {
      if (!this.disabled) {
        console.log('click')
      }
    })
  }

  get open() {
    return this.hasAttribute('open')
  }

  set open(val) {
    if (val) {
      this.setAttribute('open', '')
    } else {
      this.removeAttribute('open')
    }
  }

  get disabled() {
    return this.hasAttribute('disabled')
  }

  set disabled(val) {
    if (val) {
      this.setAttribute('disabled', '')
    } else {
      this.removeAttribute('disabled')
    }
  }

  connectedCallback() {
  }

  disconnectedCallback() {
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
  }
}

// https://whatwg-cn.github.io/html/
// https://whatwg-cn.github.io/html/multipage/custom-elements.html#custom-elements
// https://developers.google.cn/web/fundamentals/web-components/customelements
// https://html.spec.whatwg.org/multipage/indices.html#element-interfaces for the list of other DOM interfaces.
class FancyButton extends HTMLButtonElement {
  constructor() {
    super() // always call super() first in the ctor.
    this.addEventListener('click', e => this.drawRipple(e.offsetX, e.offsetY))
  }

  // Material design ripple animation.
  drawRipple(x, y) {
    let div = document.createElement('div')
    div.classList.add('ripple')
    this.appendChild(div)
    div.style.top = `${y - div.clientHeight / 2}px`
    div.style.left = `${x - div.clientWidth / 2}px`
    div.style.backgroundColor = 'currentColor'
    div.classList.add('run')
    div.addEventListener('transitionend', e => div.remove())
  }
}

customElements.define('fancy-button', FancyButton, {extends: 'button'})
customElements.define('app-drawer', AppDrawer)

window.onload = init

function init() {
  let appDrawer0 = document.querySelectorAll('app-drawer')[0]
  let appDrawer1 = document.querySelectorAll('app-drawer')[1]
  appDrawer0.open = 1
  appDrawer1.disabled = 1
}
