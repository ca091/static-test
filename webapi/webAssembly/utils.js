function loadWebAssembly(filename, imports = {}, type = 'wasm') {
  if (typeof WebAssembly !== 'undefined' && type === 'wasm') {
    return fetch(filename)
      .then(response => response.arrayBuffer())
      .then(buffer => WebAssembly.compile(buffer))
      .then(module => {
        imports.env = imports.env || {}
        Object.assign(imports.env, {
          memoryBase: 0,
          tableBase: 0,
          memory: new WebAssembly.Memory({initial: 256, maximum: 256}),
          table: new WebAssembly.Table({initial: 0, maximum: 0, element: 'anyfunc'}),
        })
        return new WebAssembly.Instance(module, imports)
      })
  } else {
    filename = filename.replace(/\.wasm$/, '.js')
    return new Promise((resolve, reject) => {
      let instance = {
        exports: function () {

        },
      }
      resolve(instance)
    })
  }
}

function test() {
  loadWebAssembly('a.wasm').then(instance => {
    let func = instance.exports._func
    func()
  })
}
