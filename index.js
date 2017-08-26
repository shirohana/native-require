const Module = require('module')
const path = require('path')

// To solve relative requirings and resolvings for `nrequire.from`
const NON_EXISTS_FILENAME = '__native_require__'

function NativeRequire (options) {
  options = options || {};
  const basedir = (typeof options.basedir === 'string' ? path.resolve(options.basedir) : process.cwd())

  const nativeModule = {
    id: '<repl>',
    exports: {},
    parent: undefined,
    filename: path.join(basedir, NON_EXISTS_FILENAME),
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
    return NativeRequire({
      basedir: basedir
    })
  }

  return nativeRequire
}

const instance = NativeRequire()

module.exports = instance
