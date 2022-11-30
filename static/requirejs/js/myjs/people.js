;(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory)
  } else if (typeof exports === 'object') {
    factory(require('jquery'))
  } else {
    factory(jQuery)
  }
})(function (jQuery) {

  console.log('load people.js...')

  //a time consuming task
  function wait() {
    var dtd = $.Deferred()
    var tasks = function () {
      console.log('task over')
      dtd.resolve() //改变状态来触发done或者fail  dtd.resolve() -- dtd.reject();
    }
    setTimeout(tasks, 2000)
    return dtd
    //防止执行状态被外部改变--返回promise对象
    //return dtd.promise();
  }

  function task1() {
    console.log('begin task 1')
    var dtd = $.Deferred()
    setTimeout(function () {
      dtd.reject()
    }, 2000)
    return dtd.promise()
  }

  function task2() {
    console.log('begin task 2')
    var dtd = $.Deferred()
    setTimeout(function () {
      dtd.resolve()
    }, 2000)
    return dtd.promise()
  }

  function task3() {
    console.log('begin task 3')
    var dtd = $.Deferred()
    setTimeout(function () {
      dtd.resolve()
    }, 2000)
    return dtd.promise()
  }

  function task4() {
    console.log('begin task 4')
    var dtd = $.Deferred()
    setTimeout(function () {
      dtd.resolve()
    }, 2000)
    return dtd.promise()
  }

  function task5() {
    console.log('begin task 5')
    var dtd = $.Deferred()
    setTimeout(function () {
      dtd.resolve()
    }, 2000)
    return dtd.promise()
  }

  //$.when(wait())
  //    .done(function () {
  //        console.log('begin task 2')
  //    })
  //    .fail(function () {
  //        console.log('task 1 fail')
  //    })
  //    .done(function () {
  //        console.log('begin task 3')
  //    });

  //此处不能用done
  $.when(wait())
    .then(function () {
      return task1()
    }, function () {
      console.log('task fail')
    })
    .then(function () {
      return task2()
    }, function () {
      console.log('task1 fail')//后续任务会被阻塞
    })
    .then(function () {
      return task3()
    })
    .then(function () {
      return task4()
    })
    .then(function () {
      return task5()
    })

  //define 对外暴露的接口 (一般是函数或对象)
  console.log('程序不会被终止')
  return 'ABC'

})
