let data = null
self.addEventListener('connect', e => {
  const port = e.ports[0]
  port.addEventListener('message', event => {
    // get 指令则返回存储的消息数据
    if (event.data.get) {
      data && port.postMessage(data)
    }
    // 非 get 指令则存储该消息数据
    else {
      data = event.data
    }
  })
  port.start()
})
