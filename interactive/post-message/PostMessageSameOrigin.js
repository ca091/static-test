/**
 * to use:
 * let pm = PostMessageSameOrigin.create(type, handler)
 * 暴露发送接口：pm.postMessage(msg)
 */

function useBroadcastChannel(broadcastChannelName) {
  if (typeof broadcastChannelName !== 'string' || !broadcastChannelName) {
    throw Error('broadcastChannelName is not string')
  }
  let bc = new BroadcastChannel(broadcastChannelName)
  bc.onmessage = msg => {
    PostMessageSameOrigin.handleMsg(msg.data, 'BroadcastChannel')
  }
  return {
    postMessage: msg => bc.postMessage(PostMessageSameOrigin.createMsg(msg, location.href)),
  }
}

function useServiceWorker() {
  navigator.serviceWorker.register('./sw.js').then(e => {
    console.log('Service Worker 注册成功')
  })
  navigator.serviceWorker.addEventListener('message', msg => {
    PostMessageSameOrigin.handleMsg(msg.data, 'Service Worker')
  })
  return {
    postMessage: msg => navigator.serviceWorker.controller.postMessage(msg),
  }
}

function useLocalStorage() {
  window.addEventListener('storage', e => {
    if (e.key === PostMessageSameOrigin.config.localStorageKey) {
      PostMessageSameOrigin.handleMsg(e.newValue, 'LocalStorage')
    }
  })
  return {
    postMessage: msg => {
      let msgData = PostMessageSameOrigin.createMsg(msg, location.href, Date.now())
      localStorage.setItem(PostMessageSameOrigin.config.localStorageKey, msgData)
    },
  }
}

// 轮询不友好
function useSharedWorker() {
  const sharedWorker = new SharedWorker('./shared.js', PostMessageSameOrigin.config.sharedWorkerName)
  // 定时轮询，发送 get 指令的消息
  let timer = setInterval(() => {
    sharedWorker.port.postMessage({get: true})
  }, 1000)
  // 监听 get 消息的返回数据
  sharedWorker.port.addEventListener('message', e => {
    PostMessageSameOrigin.handleMsg(e.data.data, 'SharedWorker')
  }, false)
  sharedWorker.port.start()
  return {
    postMessage: msg => {
      sharedWorker.port.postMessage(PostMessageSameOrigin.createMsg(msg, location.href))
    },
    clear: () => {
      clearInterval(timer)
    },
  }
}

function useWindowOpen() {
  window.addEventListener('message', e => {
    let {msgData, windowName, fromOpenner} = e.data
    PostMessageSameOrigin.handleMsg(msgData, 'WindowOpen')
    // 不做多级传递
    // // 避免消息回传
    // if (window.opener && !window.opener.closed && !fromOpenner) {
    //     window.opener.postMessage({fromOpenner: false, windowName, msg})
    // }
    // // 过滤掉已经关闭的窗口
    // childWins = childWins.filter(w => !w.closed)
    // // 避免消息回传
    // if (childWins && fromOpenner) {
    //     childWins.forEach(w => w.postMessage({fromOpenner: true, windowName, msg}))
    // }
  })
  return {
    childWins: [],
    postMessage: (msg, wins) => {
      let msgData = PostMessageSameOrigin.createMsg(msg, location.href)
      let windowName = window.name
      // 过滤掉已经关闭的窗口
      let childWins = wins.filter(w => !w.closed)
      if (childWins.length > 0) {
        childWins.forEach(w => w.postMessage({fromOpenner: true, windowName, msgData}))
      }
      if (window.opener && !window.opener.closed) {
        window.opener.postMessage({fromOpenner: false, windowName, msgData})
      }
    },
  }
}

const PostMessageSameOrigin = {
  create(type, handler) {
    this.handler = handler
    switch (type) {
      case PostMessageSameOrigin.messageType.BroadcastChannel:
        return useBroadcastChannel(PostMessageSameOrigin.config.broadcastChannelName)
      case PostMessageSameOrigin.messageType.ServiceWorker:
        return useServiceWorker()
      case PostMessageSameOrigin.messageType.LocalStorage:
        return useLocalStorage()
      case PostMessageSameOrigin.messageType.SharedWorker:
        return useSharedWorker()
      case PostMessageSameOrigin.messageType.WindowOpen:
        return useWindowOpen()
      default:
        break
    }
  },
  messageType: {
    BroadcastChannel: Symbol('BroadcastChannel'), // 广播模式
    ServiceWorker: Symbol('ServiceWorker'), // 广播模式
    LocalStorage: Symbol('LocalStorage'), // 广播模式
    SharedWorker: Symbol('SharedWorker'), // 共享存储模式
    WindowOpen: Symbol('WindowOpen'), // window.open
  },
  config: {
    broadcastChannelName: 'host_channel',
    split: '===', // 消息体解析规则
    localStorageKey: 'p-m-key', // LocalStorage存储的key值
    sharedWorkerName: 'sharedWorkerHost',
  },
  setConfig(options = {}) {
    this.config = Object.assign({}, this.config, options)
  },
  handler: () => {
  }, // 调用create()初始化
  handleMsg(msg, type) {
    console.log('sdk onmessage: ', msg)
    let data = msg.split(this.config.split)
    this.handler({type, msg: data[0], from: data[1]})
  },
  createMsg(msg, from, otherString = '') {
    return `${msg}${this.config.split}${from}${this.config.split}${otherString}`
  },
}

export default PostMessageSameOrigin

// 对于同源页面，常见的方式包括：
// 广播模式：Broadcast Channe / Service Worker / LocalStorage + StorageEvent
// 共享存储模式：Shared Worker / IndexedDB / cookie
// 口口相传模式：window.open + window.opener
// 基于服务端：Websocket / Comet / SSE 等

// 而对于非同源页面，则可以通过嵌入同源 iframe 作为“桥”，将非同源页面通信转换为同源页面通信。
