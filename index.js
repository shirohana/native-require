const Module = require('module');
const path = require('path');

// To solve relative requirings and resolvings for `nrequire.from`
const NON_EXISTS_FILENAME = '__native_require__';

function initOptions (_options) {
  // Shallow copy to prevent side effect
  const options = (typeof _options === 'object') ? Object.assign({}, _options) : {};
  let basedir = null;

  if (module.parent && typeof module.parent.filename === 'string') {
    basedir = path.dirname(module.parent.filename); // Required from module
  } else {
    basedir = process.cwd(); // Required from Node CLI
  }

  if (typeof options.basedir === 'string' && !path.isAbsolute(options.basedir)) {
    options.basedir = path.join(basedir, options.basedir);
  } else {
    options.basedir = basedir;
  }

  return options;
}

function nativeRequire (_options) {
  const options = initOptions(_options);
  const nmodule = {
    id: '<repl>',
    exports: {},
    parent: module.parent,
    filename: path.join(options.basedir, NON_EXISTS_FILENAME),
    loaded: false,
    children: [],
    paths: Module._nodeModulePaths(options.basedir)
  };

  const nrequire = function require (request) {
    try {
      return Module.prototype.require.call(nmodule, request);
    } catch (err) {
      if (err.code === 'MODULE_NOT_FOUND') {
        err.message += ' from \'' + options.basedir + '\'';
      }
      throw err;
    }
  };

  Object.assign(nrequire, {
    main: process.mainModule,
    extensions: Module._extensions,
    cache: Module._cache,
    require: nrequire,
    resolve: function resolve (request) {
      try {
        return Module._resolveFilename(request, nmodule);
      } catch (err) {
        if (err.code === 'MODULE_NOT_FOUND') {
          err.message += ' from \'' + options.basedir + '\'';
        }
        throw err;
      }
    },
    from: function from (_basedir) {
      return nativeRequire({
        basedir: _basedir
      });
    }
  });

  return nrequire;
}

const instance = nativeRequire();

module.exports = instance;
