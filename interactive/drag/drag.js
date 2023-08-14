;(function () {
  var add = $('.btn-add')
  var sub = $('.btn-sub')
  var filesBox = $('.files-box')
  var module = $('#module')
  add.on('click', addModule)
  sub.on('click', subFiles)
  var F = {
    id: 0,
    sorts: [],
    files: [],
  }
  var ajaxJson = {
    sorts: [2, 1],
    files: [
      {
        fileId: '1',
        path: '123',
        img: {
          id: '1',
          imgPath: 'xxx',
        },
      },
      {
        fileId: '2',
        path: '456',
        img: {
          id: '2',
          imgPath: 'xxx',
        },
      },
    ],
  }

  //初始化数据
  initData()
  //初始化删除事件
  initEvent()

  function initData() {
    //todo 从后台获取数据
    if (ajaxJson.files.length) {
      F.id = ajaxJson.sorts.reduce(function (previousValue, currentValue) {
        return previousValue > currentValue ? previousValue : currentValue
      })
      ajaxJson.sorts.forEach(function (item) {
        ajaxJson.files.forEach(function (f_item) {
          parseInt(f_item.fileId) === item && addModule(f_item)
        })

      })
    }
  }

  //新增条目
  function addModule(data) {
    var cloneModule = module.clone()
    var id
    if (data.fileId) {
      id = data.fileId
      cloneModule.find('[name=\'path\']').val(data.path)
    } else {
      id = ++F.id
    }
    cloneModule.attr('id', id)
    filesBox.append(cloneModule)
    initEvent()
  }

  //提交所有
  function subFiles() {
    var files = $('.file-box')
    F.files = []
    F.sorts = []
    files.each(function (ind, ele) {
      if (ind === 0) return
      var data = {
        fileId: ele.id,
        path: $(ele).find('[name=\'path\']').val(),
        img: {
          id: ele.id,
          imgPath: 'xxx',
        },
      }
      F.files.push(data)
      F.sorts.push(parseInt(ele.id))
    })
    console.log(F)
  }

  function initEvent() {
    var del = $('.btn-del')
    del.on('click', function () {
      var fileBox = $(this).parents('.file-box')
      fileBox.remove()
    })
  }
})(window)

//开始拖动
function drag(ev) {
  ev.dataTransfer.setData('id', ev.target.id)
  ev.dataTransfer.setData('y1', ev.y)
}

//事件规定在何处放置被拖动的数据。
function dragover(ev) {
  ev.preventDefault()
}

//放置
function drop(ev) {
  ev.preventDefault()
  var id = ev.dataTransfer.getData('id')
  var y1 = parseInt(ev.dataTransfer.getData('y1'))
  var y2 = ev.y
  //拖拽元素
  var dragEle = $('#' + id)
  //目标元素
  var fileBox = $(ev.target).parents('.file-box')
  if (!fileBox.length || fileBox[0].id == id) return
  if (y1 < y2) {
    //往下拽
    var next = dragEle.next()
    //拖拽元素 插入 目标元素 之下
    fileBox.after(dragEle)
    if (next[0].id == fileBox[0].id) return
    next.before(fileBox)
  } else {
    //往上拽
    var prev = dragEle.prev()
    //拖拽元素 插入 目标元素 之上
    fileBox.before(dragEle)
    if (prev[0].id == fileBox[0].id) return
    prev.after(fileBox)
  }
}



