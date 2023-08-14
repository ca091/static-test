class DragLikeJira {
  constructor({main = '.bug-main', boxes = '.bug-box', items = '.bug-item', column = 4, height = 80}) {
    this.el_bug_main = typeof main === 'string' ? document.querySelector(main) : main
    this.el_bug_boxs = typeof boxes === 'string' ? this.el_bug_main.querySelectorAll(boxes) : boxes
    this.el_bugs = typeof items === 'string' ? this.el_bug_main.querySelectorAll(items) : items
    this.column = column
    this.bug_width = this.el_bug_main.getBoundingClientRect().width / this.column
    this.bug_height = height
    // 临时数据
    this.initPoint = {x: 0, y: 0}
    this.movePoint = {x: 0, y: 0}
    this.target_data = {column: 0, floor: 0, target: null, moveTo: null}
    // 本列拖动时缓存需要移动的el_bugs
    this.cache_move_items = []
    this.setTargetAction = throttle(this._setTargetAction.bind(this), 500)
    this.addEvent()
  }

  addEvent() {
    [...this.el_bug_boxs].map((el_bugs_box, index) => {
      el_bugs_box.addEventListener('dragover', e => {
        e.preventDefault()
      });
      [...el_bugs_box.querySelectorAll('.bug-item')].map((el_bug, ind) => {
        el_bug.setAttribute('data-column', index)
        el_bug.setAttribute('data-floor', ind)
      })
    });

    [...this.el_bugs].map((el_bug, index) => {
      this._addEvent(el_bug)
      el_bug.textContent = index
    })
  }

  _addEvent(el_bug) {
    el_bug.addEventListener('dragstart', e => {
      this.initPoint.x = e.clientX
      this.initPoint.y = e.clientY
      this.target_data = {
        column: +e.currentTarget.dataset.column,
        floor: +e.currentTarget.dataset.floor,
        target: e.currentTarget,
      }
    })
    el_bug.addEventListener('drag', throttle(e => {
      e.preventDefault()
      this.movePoint.x = e.clientX
      this.movePoint.y = e.clientY
      e.target.style.transform = `translate(${this.movePoint.x - this.initPoint.x}px, ${this.movePoint.y - this.initPoint.y}px)`
      this.setTargetAction()
    }, 33))
    el_bug.addEventListener('drop', e => {
      e.preventDefault()
      let target = this.target_data.target
      let column = this._getColumn()
      let floor = this._getFloor()
      target.parentNode.removeChild(target)
      if (column !== this.target_data.column) DragLikeJira._resetFloor(this.el_bug_boxs[this.target_data.column])
      target.style.transform = `translate(0px, 0px)`
      target.dataset.column = column
      this.el_bug_boxs[column].insertBefore(target, this.el_bug_boxs[column].querySelectorAll('.bug-item')[floor])
      DragLikeJira._resetFloor(this.el_bug_boxs[column])
      this._resetData()
    })
  }

  _setTargetAction() {
    let column = this._getColumn()
    let floor = this._getFloor()
    let el_bugs = [...this.el_bug_boxs[column].querySelectorAll('.bug-item')]
    let moveTo = el_bugs[floor]
    if (column === this.target_data.column) {
      let isUp = floor < this.target_data.floor
      let [start, end] = [floor, this.target_data.floor].sort()
      if (start === end) {
        if (this.cache_move_items.length) DragLikeJira._resetStyle(this.cache_move_items)
      } else {
        let needMove = isUp ? el_bugs.slice(start, end) : el_bugs.slice(start + 1, end + 1)
        let notInCache = this._getNotInCache(needMove)
        if (notInCache) DragLikeJira._resetStyle(notInCache)
        this.cache_move_items = needMove
        this._setStyle(needMove, isUp)
      }
    } else {
      if (this.target_data.moveTo !== moveTo) {
        if (this.target_data.moveTo) this.target_data.moveTo.style.marginTop = '-1px'
        this.target_data.moveTo = moveTo
        if (moveTo) moveTo.style.marginTop = `${this.bug_height}px`
      }
    }
  }

  _resetData() {
    if (this.cache_move_items.length) DragLikeJira._resetStyle(this.cache_move_items)
    this.cache_move_items = []
    if (this.target_data.moveTo) this.target_data.moveTo.style.marginTop = '-1px'
    this.target_data = {column: 0, floor: 0, target: null, moveTo: null}
    this.initPoint = {x: 0, y: 0}
    this.movePoint = {x: 0, y: 0}
  }

  _getColumn() {
    return this.target_data.column + Math.floor(((this.movePoint.x - this.initPoint.x) + this.bug_width / 2) / this.bug_width)
  }

  _getFloor() {
    return this.target_data.floor + Math.floor(((this.movePoint.y - this.initPoint.y) + this.bug_height / 2) / this.bug_height)
  }

  _getNotInCache(arr) {
    let re = []
    for (let i of this.cache_move_items) {
      if (arr.indexOf(i) === -1) re.push(i)
    }
    return re
  }

  _setStyle(el_bugs, isUp) {
    for (let el_bug of el_bugs) {
      el_bug.style.transform = `translate(0px, ${isUp ? this.bug_height : -this.bug_height}px)`
    }
  }

  static _resetFloor(el_bugs_box) {
    [...el_bugs_box.querySelectorAll('.bug-item')].map((el_bug, ind) => {
      el_bug.setAttribute('data-floor', ind)
    })
  }

  static _resetStyle(el_bugs) {
    for (let el_bug of el_bugs) {
      el_bug.style.transform = 'translate(0px, 0px)'
    }
  }
}
