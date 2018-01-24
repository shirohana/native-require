const Module = require('module')
const path = require('path')

// To solve relative requires and resolves from `_require.from`
const UNIQUE_FILENAME = '__NATIVE_REQUIRE__'

const cache = {}

function resolveBasedir (basedir) {
  /* istanbul ignore next: `module.parent` will be undefined when required from Node CLI */
  const moduleBasedir = (module.parent && module.parent.filename ? path.dirname(module.parent.filename) : process.cwd())
  return (basedir ? path.resolve(moduleBasedir, basedir) : moduleBasedir)
}

function initOptions (_opt) {
  const opt = _opt || {}
  const options = {}
  options.basedir = resolveBasedir(opt.basedir)
  return options
}

function nativeRequire (opt) {
  const options = initOptions(opt)
  const _module = {
    id: '<repl>',
    exports: {},
    parent: module.parent,
    filename: path.join(options.basedir, UNIQUE_FILENAME),
    loaded: false,
    children: [],
    paths: Module._nodeModulePaths(options.basedir)
  }

  function _require (request) {
    try {
      return Module.prototype.require.call(_module, request)
    } catch (err) {
      /* istanbul ignore else */
      if (err.code === 'MODULE_NOT_FOUND') {
        err.message += ` from '${options.basedir}'`
      }
      throw err
    }
  }

  Object.assign(_require, {
    main: process.mainModule,
    extensions: Module._extensions,
    cache: Module._cache,
    require: _require,
    resolve: function (request) {
      try {
        return Module._resolveFilename(request, _module)
      } catch (err) {
        /* istanbul ignore else */
        if (err.code === 'MODULE_NOT_FOUND') {
          err.message += ` from '${options.basedir}'`
        }
        throw err
      }
    },
    from: function (from) {
      const basedir = resolveBasedir(from)
      return cache[basedir] || (cache[basedir] = nativeRequire({
        basedir: basedir
      }))
    }
  })

  return _require
}

const instance = nativeRequire()

module.exports = instance
