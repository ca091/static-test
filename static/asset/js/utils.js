function throttle(handler, duration) {
  let begin = new Date()
  let current = null
  return (...args) => {
    current = new Date()
    if (current - begin > duration) {
      handler.call(this, ...args)
      begin = current
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

function wait(time) {
  return new Promise(resolve => setTimeout(resolve, time))
}
