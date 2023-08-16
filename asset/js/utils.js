function throttle(handler, duration){
  let begin = 0
  let current
  let lastExecuteTimer
  return (...args) => {
    current = Date.now()
    if(current - begin > duration){
      window.clearTimeout(lastExecuteTimer)
      handler(...args)
      begin = current
    } else {
      window.clearTimeout(lastExecuteTimer)
      lastExecuteTimer = window.setTimeout(() => {
        handler(...args)
        begin = Date.now()
      }, duration)
    }
  }
}

function throttlePromise(fn, isAutoFill = false) {
  let fetchPromiseMap = new Map()

  return (...args) => {
    const MapKey = isAutoFill ? 'isAutoFill' : args[0]
    console.log('call fn MapKey =', MapKey)

    if (fetchPromiseMap.has(MapKey)) {
      return fetchPromiseMap.get(MapKey)
    }

    let promise = fn(...args)
      .finally(() => {
        fetchPromiseMap.delete(MapKey)
      })

    fetchPromiseMap.set(MapKey, promise)

    return promise
  }
}

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
    },
  }
}

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

function extend(Sup, Sub) {
  let prototype = Object.create(Sup.prototype)
  prototype.constructor = Sub
  Sub.prototype = prototype
}
