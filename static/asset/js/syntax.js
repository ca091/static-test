'use strict'

var person = {
  _name: 'cc',
  age: 11,
  showName: function () {
    console.log('name=' + this._name + ',age=' + this.age)
  },
}

//数据属性-访问器属性
Object.defineProperty(person, '_name', {
  writable: true,
  configurable: true,
  enumerable: false,
  value: 'qq',
})


var descriptor = Object.getOwnPropertyDescriptor(person, '_name')

function Person(name, age) {
  this.name = name
  this.age = age
}

//指定prototype的方式
var p1 = Object.create(person) // p1 --> person
Person.prototype = {
  toString: function () {
    console.log('[' + this.name + ',age' + this.age + ']')
  },
}
var p2 = new Person('cc', 20) // p2 --> Person.prototype
//console.log(p2.__proto__.constructor.toString())
//console.log(Person.prototype.isPrototypeOf(p2)) //true
//console.log(Object.getPrototypeOf(p2)) //{ showName: [Function] }
//console.log(p2.hasOwnProperty('name')) //true

function hasPrototypeProperty(obj, name) {
  return !obj.hasOwnProperty(name) && (name in obj)
}

//包含prototype - 排除unenumerable
//for(var item in p2){
//	console.log(item)
//}

//不包含prototype - 排除unenumerable
var propertyArr = Object.keys(p2)
//console.log(propertyArr) //[ 'name', 'age' ]

//不包含prototype - 不排除unenumerable
var allProperty = Object.getOwnPropertyNames(person)
//console.log(allProperty) //[ '_name', 'age', 'showName' ]

//创建函数时 自动创建prototype,prototype包含constructor属性
function Dog() {

}

//console.log(Object.getOwnPropertyNames(Dog.prototype)) //[ 'constructor' ]
//这样声明会使Dog.prototype.constructor消失
Dog.prototype = {
  color: 'red',
}
//console.log(Object.getOwnPropertyNames(Dog.prototype)) //[ 'color' ]

//console.log(Object.getOwnPropertyNames(Object.prototype)) //[ 'color' ]
function extend(Sup, Sub) {
  var prototype = Object.create(Sup.prototype)
  prototype.constructor = Sub
  Sub.prototype = prototype
}

function A(name) {
  this.name = name
  this.color = ['red', 'gray']
}

A.prototype = {
  show: function () {
    console.log('this is show method')
  },
}

function B(name, age) {
  A.call(this, name)
  this.age = age
}

extend(A, B)
B.prototype.say = function () {
  console.log('say')
}

var a = new A
