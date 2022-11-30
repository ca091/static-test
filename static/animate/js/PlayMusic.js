/**
 * 歌曲播放-上下跳动动画
 */
class PlayMusic {
  constructor(el) {
    this.el = typeof el === 'string' ? document.querySelector(el) : el
  }

  play() {
    this.el.className = this.el.className + ' playing'
  }

  pause() {
    this.el.className = this.el.className.replace(/playing/, '').trim()
  }
}

/**
 * 歌曲播放-时间线移动动画
 */
class PlayMusicLine {
  constructor(el, duration = 0) {
    this.el = typeof el === 'string' ? document.querySelector(el) : el
    this.duration = duration
  }

  play() {
    this.el.style.animationPlayState = 'running'
  }

  pause() {
    this.el.style.animationPlayState = 'paused'
  }

  unset() {
    this.el.style.animation = 'unset'
  }

  setAnimationLine() {
    let animationName = getComputedStyle(this.el).animationName
    if (animationName === 'none' && this.duration !== 0) this.el.style.animation = `music_play_line ${this.duration}s linear 0ms`
  }

  setDuration(duration) {
    this.duration = duration
  }
}

/**
 * 歌曲播放-歌词显示动画
 * 歌词的html结构可根据歌词文件生成: https://github.com/erluzi/node-yarn/blob/master/practice/parseLyrics/parseLyrics.js
 */
class PlayLyrics {
  constructor(el) {
    this.lyrics = typeof el === 'string' ? [...document.querySelectorAll(el)] : [...el]
    this.activeItem = null
    this.isPlaying = false
  }

  play() {
    if (!this.isPlaying) {
      this.isPlaying = true
      this.asyncPlay().then(() => {
        console.log('over')
        this.isPlaying = false
      })
    } else {
      this.activeItem.style.animationPlayState = 'running'
    }
  }

  pause() {
    this.activeItem.style.animationPlayState = 'paused'
  }

  async asyncPlay() {
    for (let i of this.lyrics) {
      await this.playOne(i)
    }
  }

  playOne(item) {
    return new Promise((resolve, reject) => {
      this.activeItem = item
      let start = item.dataset.start
      let end = item.dataset.end
      if (!end) {
        end = item.parentNode.nextElementSibling.childNodes[0].dataset.start
      }
      let timeStartArr = start.split(':')
      let timeEndArr = end.split(':')
      let duration = parseInt(timeEndArr[0]) * 60 - parseInt(timeStartArr[0]) * 60 + parseFloat(timeEndArr[1]) - parseFloat(timeStartArr[1])
      console.log(start, end, duration)
      item.scrollIntoView({behavior: 'smooth', block: 'center'})
      item.style.fontSize = '18px'
      item.style.animation = `bg-move ${duration * 1000}ms linear`
      item.addEventListener('animationend', e => {
        item.style.animation = 'unset'
        item.style.fontSize = 'unset'
        resolve()
      })
    })
  }
}
