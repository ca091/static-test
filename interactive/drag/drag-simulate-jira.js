let el_bug_main = document.querySelector('.bug-main')
let el_bug_boxs = document.querySelectorAll('.bug-box')
let el_bugs = document.querySelectorAll('.bug-item')
const bcr_main = el_bug_main.getBoundingClientRect()
// 列数
const column = 4
// 列宽
const el_bug_box_width = bcr_main.width / column
// 条目高
const el_bug_height = 80
// 临时数据
let initPoint = {x: 0, y: 0}
let movePoint = {x: 0, y: 0}
let target_data = {column: 0, floor: 0, target: null, moveTo: null}
// 本列拖动时缓存需要移动的el_bugs
let cache_move_items = []
// drop时计算列的条件
// let column_gap_move_left = [];
// let column_gap_move_right = [];
// for(let i=0; i<column; i++){
//     column_gap_move_left.push(el_bug_box_width / 2 + el_bug_box_width * i);
//     column_gap_move_right.unshift(el_bug_box_width / 2 + el_bug_box_width * i)
// }

;[...el_bug_boxs].map((el_bugs_box, index) => {
  addEventBox(el_bugs_box);
  [...el_bugs_box.querySelectorAll('.bug-item')].map((el_bug, ind) => {
    el_bug.setAttribute('data-column', index)
    el_bug.setAttribute('data-floor', ind)
  })
});

[...el_bugs].map((el_bug, index) => {
  addEvent(el_bug)
  el_bug.textContent = index
  // el_bug.style.backgroundColor = `#${Math.floor(Math.random()*Math.pow(16, 6)).toString(16)}`;
})

function addEventBox(el_bugs_box) {
  el_bugs_box.addEventListener('dragover', e => {
    e.preventDefault()
  })
}

function addEvent(el_bug) {
  el_bug.addEventListener('dragstart', e => {
    initPoint.x = e.clientX
    initPoint.y = e.clientY
    target_data = {
      column: +e.currentTarget.dataset.column,
      floor: +e.currentTarget.dataset.floor,
      target: e.currentTarget,
    }
  })
  el_bug.addEventListener('drag', throttle(e => {
    e.preventDefault()
    movePoint.x = e.clientX
    movePoint.y = e.clientY
    e.target.style.transform = `translate(${movePoint.x - initPoint.x}px, ${movePoint.y - initPoint.y}px)`
    setTargetAction()
  }, 33))
  // el_bug.addEventListener('dragend', e => {
  //     e.target.style.transform = `translate(0px, 0px)`
  // });
  el_bug.addEventListener('drop', e => {
    e.preventDefault()
    // let target = e.currentTarget;
    // let bcr = target.getBoundingClientRect();
    // let column = getColumn(bcr);
    let target = target_data.target
    let column = _getColumn()
    let floor = _getFloor()
    target.parentNode.removeChild(target)
    if (column !== target_data.column) _resetFloor(el_bug_boxs[target_data.column])
    target.style.transform = `translate(0px, 0px)`
    target.dataset.column = column
    el_bug_boxs[column].insertBefore(target, el_bug_boxs[column].querySelectorAll('.bug-item')[floor])
    _resetFloor(el_bug_boxs[column])
    _resetData()
  })
}

function _getColumn() {
  return target_data.column + Math.floor(((movePoint.x - initPoint.x) + el_bug_box_width / 2) / el_bug_box_width)
}

function _getFloor() {
  return target_data.floor + Math.floor(((movePoint.y - initPoint.y) + el_bug_height / 2) / el_bug_height)
}

function _resetData() {
  if (cache_move_items.length) _resetStyle(cache_move_items)
  cache_move_items = []
  if (target_data.moveTo) target_data.moveTo.style.marginTop = '-1px'
  target_data = {column: 0, floor: 0, target: null, moveTo: null}
  initPoint = {x: 0, y: 0}
  movePoint = {x: 0, y: 0}
}

function _resetFloor(el_bugs_box) {
  [...el_bugs_box.querySelectorAll('.bug-item')].map((el_bug, ind) => {
    el_bug.setAttribute('data-floor', ind)
  })
}

/**
 * set target action when dragging
 * @private
 */
function _setTargetAction() {
  let column = _getColumn()
  let floor = _getFloor()
  let el_bugs = [...el_bug_boxs[column].querySelectorAll('.bug-item')]
  let moveTo = el_bugs[floor]
  if (column === target_data.column) {
    let isUp = floor < target_data.floor
    let [start, end] = [floor, target_data.floor].sort()
    if (start === end) {
      if (cache_move_items.length) _resetStyle(cache_move_items)
    } else {
      let needMove = isUp ? el_bugs.slice(start, end) : el_bugs.slice(start + 1, end + 1)
      let notInCache = _getNotInCache(needMove)
      if (notInCache) _resetStyle(notInCache)
      cache_move_items = needMove
      _setStyle(needMove, isUp)
    }
  } else {
    if (target_data.moveTo !== moveTo) {
      if (target_data.moveTo) target_data.moveTo.style.marginTop = '-1px'
      target_data.moveTo = moveTo
      if (moveTo) moveTo.style.marginTop = `${el_bug_height}px`
    }
  }
}

const setTargetAction = throttle(_setTargetAction, 500)

function _getNotInCache(arr) {
  let re = []
  for (let i of cache_move_items) {
    if (arr.indexOf(i) === -1) re.push(i)
  }
  return re
}

function _setStyle(el_bugs, isUp) {
  for (let el_bug of el_bugs) {
    el_bug.style.transform = `translate(0px, ${isUp ? el_bug_height : -el_bug_height}px)`
  }
}

function _resetStyle(el_bugs) {
  for (let el_bug of el_bugs) {
    el_bug.style.transform = 'translate(0px, 0px)'
  }
}

// function getColumn(bcr) {
//     let isRight = movePoint.x - initPoint.x > 0;
//     for(let gap of isRight ? column_gap_move_right : column_gap_move_left){
//         if(isRight ? bcr.right > gap : bcr.left < gap){
//             return column_gap_move_left.indexOf(gap)
//         }
//     }
// }
//
// function getRow(bcr) {
//     // 40 - 120 - 200
//     return Math.floor((bcr.top + el_bug_height / 2) / el_bug_height)
// }
