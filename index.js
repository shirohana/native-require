const Module = require('module')

function NativeRequire (options = {}) {
  this.basedir = (typeof options.basedir === 'string' ? options.basedir : process.cwd())
  this.nativeModule = {
    id: '<repl>',
    exports: {},
    parent: undefined,
    filename: null,
    loaded: false,
    children: [],
    paths: Module._nodeModulePaths(this.basedir)
  }

  const nativeRequire = Module.prototype.require.bind(this.nativeModule)
  nativeRequire.resolve = (request) => Module._resolveFilename(request, this.nativeModule)
  nativeRequire.main = process.mainModule
  nativeRequire.extensions = Module._extensions
  nativeRequire.cache = Module._cache

  return nativeRequire
}

const instance = NativeRequire()
module.exports = instance
