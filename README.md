native-require
==============
> Requiring external node modules in Webpack

When you're creating a library and packed with Webpack, you usually have to dynamic require some .js files which user provided.

With this module, you can require from external `node_modules` without getting a 'Critical dependency' warning.

## Quick usage
#### Install
```sh
// Using with `webpack-node-externals`
$ npm install --save native-require

// Using without `webpack-node-externals`
$ npm install --save-dev native-require
```

#### Use in your code
```javascript
// Simple use
const nrequire = require('native-require')
nrequire('axios')
nrequire.resolve('axios')

// Resolve from another dir. (useful in helper modules)
const nrequire = require('native-require').from(userProvidedBasedir)
nrequire('axios')
nrequire.resolve('axios')
```

## API
- `nrequire(path: String)` : Require module from `process.cwd()`, just like _require()_
- `nrequire.resolve(request: String)` : Resolve module dir from `process.cwd()`, just like _require.resolve()_
- `nrequire.from(basedir: String)` : Return a new module instance which do the same work but resolving modules from `basedir`
