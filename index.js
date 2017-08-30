const Module = require('module');
const path = require('path');

// To solve relative requirings and resolvings for `nrequire.from`
const NON_EXISTS_FILENAME = '__native_require__';

const cache = {};

function resolveBasedir (basedir) {
  if (path.isAbsolute(basedir)) {
    return basedir;
  } else if (module.parent && typeof module.parent.filename === 'string') {
    return path.join(path.dirname(module.parent.filename), basedir); // Required from module
  }
  return path.join(process.cwd(), basedir); // Required from Node CLI
}

function initOptions (_options) {
  // Shallow copy to prevent side effect
  const options = (typeof _options === 'object') ? Object.assign({}, _options) : {};
  options.basedir = resolveBasedir(options.basedir || '');

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
      const basedir = resolveBasedir(_basedir);

      return cache[basedir] || (cache[basedir] = nativeRequire({
        basedir: basedir
      }));
    }
  });

  return nrequire;
}

const instance = nativeRequire();

module.exports = instance;
