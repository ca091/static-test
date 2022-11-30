/**
 * 已知bug: 可以从插入元素的第一个文字开始删除
 */

function Cursor(el, options) {
  this.el = el
  this.options = Object.assign({}, {
    insertCls: 'team',
    insertLabel: 'span',
    gap: '&nbsp;',
  }, options || {})
  this.initEvent()
}

Cursor.prototype = {
  initEvent: function () {
    this.el.addEventListener('input', function (e) {
      let sel = window.getSelection()
      if (this.checkCursorIn(sel)) {
        // 判断是删除操作
        if (e.inputType === 'deleteContentBackward') {
          console.log('光标进入插入元素span.team，删除span.team')
          // sel.extend(sel.focusNode)
          let range = sel.getRangeAt(0)
          range.selectNode(sel.focusNode.parentNode)
          range.deleteContents()
        }
      }
    }.bind(this))

    // delete键不触发keypress
    this.el.addEventListener('keypress', function (e) {
      let sel = window.getSelection()
      if (this.checkCursorIn(sel)) {
        console.log('光标进入插入元素span.team，不可编辑')
        e.preventDefault()
      }
    }.bind(this))

    // 控制删除键
    // document.addEventListener('keydown', function (e) {
    //   if (e.key === 'Backspace') {
    //     if (document.activeElement === this.el) {
    //       let sel = window.getSelection()
    //       if (this.checkCursorIn(sel)) {
    //         console.log('光标进入插入元素span.team，删除span.team')
    //         // sel.extend(sel.focusNode)
    //         let range = sel.getRangeAt(0)
    //         range.selectNode(sel.focusNode.parentNode)
    //         range.deleteContents()
    //       }
    //     }
    //     // e.preventDefault()
    //   }
    // }.bind(this))
  },
  // 检查光标是否进入插入元素
  checkCursorIn: function (sel) {
    return Boolean(sel.focusNode && sel.focusNode.parentNode && sel.focusNode.parentNode.className === this.options.insertCls)
  },
  insert: function (content) {
    // 在输入状态（focus状态），会包含一个空选区
    this.el.focus()
    let sel = window.getSelection()
    let range = sel.getRangeAt(0)
    let frag = this._createFragInsert(content)
    range.insertNode(frag)
    this.releaseCursor(range)
  },
  _createFragInsert: function (content) {
    let el = document.createElement('div')
    let spanTeam = document.createElement(this.options.insertLabel)
    spanTeam.className = this.options.insertCls
    spanTeam.innerHTML = content
    // let spanSpace = document.createElement('span')
    // spanSpace.innerHTML = '&nbsp;'
    let space = this._createFrag(this.options.gap)
    el.appendChild(spanTeam)
    el.appendChild(space)
    let frag = document.createDocumentFragment(), node, lastNode
    while ((node = el.firstChild)) {
      lastNode = frag.appendChild(node)
    }
    return frag
  },
  _createFrag: function (content) {
    let el = document.createElement('div')
    el.innerHTML = content
    let frag = document.createDocumentFragment(), node, lastNode
    while ((node = el.firstChild)) {
      lastNode = frag.appendChild(node)
    }
    return frag
  },
  /**
   * 释放range区域
   * @param range
   * @param toEnd 是否将光标移到末尾
   */
  releaseCursor: function (range, toEnd) {
    if (toEnd && this.el.lastChild) {
      range.setStartAfter(this.el.lastChild)
      range.setEndAfter(this.el.lastChild)
    }
    // 光标折叠至末尾
    range.collapse()
    range.detach()
  },
}

Cursor.prototype.constructor = Cursor
