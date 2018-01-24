native-require
==============

*Resolve requires in an easy way*

[![npm](https://img.shields.io/npm/v/native-require.svg)](https://www.npmjs.com/package/native-require)
[![Travis](https://img.shields.io/travis/shirohana/native-require.svg)](https://www.npmjs.com/package/native-require)
[![Codecov branch](https://img.shields.io/codecov/c/github/shirohana/native-require/dev.svg)](https://codecov.io/gh/shirohana/native-require/branch/dev)
[![license](https://img.shields.io/github/license/shirohana/native-require.svg)](https://www.npmjs.com/package/native-require)

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

Getting started
---------------

##### Install
```
$ npm install native-require --save
```

##### Require or Resolve from where you want
```javascript
import _require from 'native-require'

// Seems normal but useful to resolve external modules when using bunlders
const axios = _require('axios')

// Require from specific directory
const model = _require.from('./src/model')

const User = model('./user')
// Alias
const User = model.require('./user')
```

Features
--------

- Simple to use, no more you didn't need
- Relative requires from specific directory
- Resolve external warnings from bundlers (Webpack, Rollup, etc.)
- Higher performance (no `Module` will be created)
- No dependencies
- Compatible in Node v4, v6 and v8

API
---

#### `_require(request)` (default export)

> Same as `require()`, but resolve external problems from bundlers

#### `.require(request)`

> Alias of `_require()`

#### `.resolve(request)`

> Same as `require.resolve()`

#### `.from(basedir)`

> ###### Create a new `native-require` instance but lookup modules from `basedir`

One `basedir` only create instance once, so never worry about used like

```javascript
_require.from(modelDir).require('./user')
_require.from(modelDir).require('./post')
_require.from(modelDir).require('./comment')
```
