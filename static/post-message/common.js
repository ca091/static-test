import PostMessageSameOrigin from './postMessageSameOrigin.js'

let elMsgs = document.querySelector('#msgs')
let elInputMsg = document.querySelector('#input-msg')
let elBtnSend = document.querySelector('#btn-send')
let btnOpen = document.querySelector('#open')

function appendMsg(box, msg) {
  let el = typeof box === 'string' ? document.querySelector(box) : box
  let p = document.createElement('p')
  p.textContent = msg
  el.appendChild(p)
}

function handler({type, msg, from}) {
  console.log('page onmessage: ', {type, msg, from})
  appendMsg(elMsgs, `[${type}] receive message: ${msg}, from: ${from}`)
}

// do test
// let pmInstance = PostMessageSameOrigin.create(PostMessageSameOrigin.messageType.BroadcastChannel, handler)
// let pmInstance = PostMessageSameOrigin.create(PostMessageSameOrigin.messageType.ServiceWorker, handler)
// let pmInstance = PostMessageSameOrigin.create(PostMessageSameOrigin.messageType.LocalStorage, handler)
// let pmInstance = PostMessageSameOrigin.create(PostMessageSameOrigin.messageType.SharedWorker, handler)
let pmInstance = PostMessageSameOrigin.create(PostMessageSameOrigin.messageType.WindowOpen, handler)

elBtnSend.addEventListener('click', e => {
  let valueInput = elInputMsg.value
  if (valueInput) {
    pmInstance.postMessage(valueInput, pmInstance.childWins)
  }
})

if (btnOpen) {
  btnOpen.addEventListener('click', e => {
    const win = window.open('./host-operation.html', 'pm_host_operation')
    // console.log('win', win)
    pmInstance.childWins.push(win)
  })
}

// 清除轮询
setTimeout(() => {
  pmInstance.clear && pmInstance.clear()
}, 15000)
