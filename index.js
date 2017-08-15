const Module = require('module')

function NativeRequire (options = {}) {
  const basedir = (typeof options.basedir === 'string' ? options.basedir : process.cwd())
  const nativeModule = {
    id: '<repl>',
    exports: {},
    parent: undefined,
    filename: null,
    loaded: false,
    children: [],
    paths: Module._nodeModulePaths(basedir)
  }

  const nativeRequire = Module.prototype.require.bind(nativeModule)
  nativeRequire.resolve = function (request) {
    return Module._resolveFilename(request, nativeModule)
  }
  nativeRequire.main = process.mainModule
  nativeRequire.extensions = Module._extensions
  nativeRequire.cache = Module._cache

  // Support custom basedir
  nativeRequire.from = function (basedir) {
    return NativeRequire({ basedir })
  }

  return nativeRequire
}

const instance = NativeRequire()

module.exports = instance
