self.addEventListener('message', e => {
  console.log('service worker receive message', e)
  e.waitUntil(
    // 获取当前注册了该 Service Worker 的所有页面
    self.clients.matchAll().then(clients => {
      if (!clients || clients.length === 0) return
      for (let client of clients) {
        // console.log('client is: ', client)
        if (e.source.url !== client.url) {
          client.postMessage(`${e.data}===${e.source.url}`)
        }
      }
    }),
  )
})
