self.addEventListener('message', function (e) {
  var data = e.data
  var method = data.method
  var args = data.args

  if (method === 'print') {
    print(args)
  } else if (method === 'xhr') {
    loadAsXHR(args)
  } else if (method === 'timer') {
    setTimer(args)
  }

})

function print(msg) {
  console.log(msg)
}

function loadAsXHR(url) {
  var xhr = new XMLHttpRequest()
  xhr.addEventListener('load', function () {
    var data = this.responseText
    self.postMessage({reply: data})
  })
  xhr.open('GET', url)
  xhr.send()
}

function setTimer(time) {
  var timer = setInterval(function () {
    if (time === 0) {
      clearInterval(timer)
      self.postMessage({reply: 'time over'})
    } else {
      console.log(--time)
    }
  }, 1000)
}
