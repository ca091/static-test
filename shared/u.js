function print(options, el = document.body) {
  let {message, wrapperElement} = options
  let appendEl = document.createElement(wrapperElement)
  appendEl.textContent = message
  el.appendChild(appendEl)
}

function getRunner() {
  let lastTime = 0
  let id = null
  function runner(callback, t) {
    let currTime = new Date().getTime()
    let timeWait = Math.max(0, t - (currTime - lastTime))
    id = window.setTimeout(() => {
      callback()
      runner(callback, t)
    }, timeWait)
    lastTime = currTime + timeWait
  }
  return {
    run(callback, t) {
      if (!id) runner(callback, t)
    },
    destroy() {
      window.clearTimeout(id)
      id = null
    }
  }
}
