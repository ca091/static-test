export function appendMsg(box, msg) {
  let el = typeof box === 'string' ? document.querySelector(box) : box
  let p = document.createElement('p')
  p.textContent = msg
  el.appendChild(p)
}
