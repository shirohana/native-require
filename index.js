const Module = require('module');
const path = require('path');

// To solve relative requirings and resolvings for `nrequire.from`
const NON_EXISTS_FILENAME = '__native_require__';

function basedirOf (options) {
  let basedir = null;

  if (module.parent && typeof module.parent.filename === 'string') {
    basedir = path.dirname(module.parent.filename);
  } else {
    basedir = process.cwd();
  }

  if (typeof options.basedir === 'string') {
    basedir = path.join(basedir, options.basedir);
  }

  return basedir;
}

function nativeRequire (_options) {
  const options = _options || {};
  const basedir = basedirOf(options);
  const nmodule = {
    id: '<repl>',
    exports: {},
    parent: module.parent,
    filename: path.join(basedir, NON_EXISTS_FILENAME),
    loaded: false,
    children: [],
    paths: Module._nodeModulePaths(basedir)
  };

  const nrequire = Module.prototype.require.bind(nmodule);

  Object.assign(nrequire, {
    main: process.mainModule,
    extensions: Module._extensions,
    cache: Module._cache,
    require: nrequire,
    resolve: function resolve (request) {
      return Module._resolveFilename(request, nmodule);
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
