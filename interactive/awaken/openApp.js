function openApp(options) {
  console.log('open app options', options)
  const {id, url, urlType} = options
  const appHref = `dzqh://app?url=${url}&urlType=${urlType}&id=${id}`
  const downHref = 'https://xiu.qhczy.com/applinks/online11/index.html?v='

  window.location.href = appHref

  setTimeout(() => {
    let hidden =
      window.document.hidden
      || window.document.mozHidden
      || window.document.msHidden
      || window.document.webkitHidden
    if (typeof hidden == 'undefined' || hidden === false) {
      window.location.href = downHref + Math.random()
    }
  }, 2000)
}
