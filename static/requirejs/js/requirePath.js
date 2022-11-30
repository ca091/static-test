// 异步 AMD规范 用法 define(func(){}) , require([],func(){}) ,
// baseUrl 改变基目录
// shim 非amd规范 deps：依赖模块；exports：外部调用名称
require.config({
  baseUrl: 'js',
  paths: {
    jquery: ['http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min', 'jquery-2.1.4.min'],
    lowJquery: 'jquery.min',
    rect: 'myjs/rect',
    peo: 'myjs/people',
    _: 'underscore-min',
    A: 'module/old',
  },
  config: {
    rect: {
      info: {name: 'cao'},
    },
  },
  shim: {
    'underscore': {
      exports: '_',
    },
    //'backbone': {
    //    deps: ['underscore', 'jquery'],
    //    exports: 'Backbone'
    //}
  },
  map: {
    '*': {
      'jquery': 'jquery',
    },
    'module/old': {
      'jquery': 'lowJquery',
    },
  },

})
