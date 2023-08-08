function print(options, el = document.body) {
  let {message, wrapperElement} = options
  let appendEl = document.createElement(wrapperElement)
  appendEl.textContent = message
  el.appendChild(appendEl)
}
