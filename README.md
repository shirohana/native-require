native-require
==============

[![npm](https://img.shields.io/npm/v/native-require.svg)](https://www.npmjs.com/package/native-require)
[![Travis](https://img.shields.io/travis/shirohana/native-require.svg)](https://www.npmjs.com/package/native-require)
[![Codecov branch](https://img.shields.io/codecov/c/github/shirohana/native-require/dev.svg)](https://codecov.io/gh/shirohana/native-require/branch/dev)
[![license](https://img.shields.io/github/license/shirohana/native-require.svg)](https://www.npmjs.com/package/native-require)

*Resolve requires in an easy way*

Getting started
---------------

```sh
$ npm install native-require --save
```

#### Require or Resolve from where you want

```javascript
import _require from 'native-require'

// Normal use but helpful to require externals
const axios = _require('axios')

// Require from specified basedir
const model = _require.from('./src/model')

const User = model('./user')
const Production = model.require('./production') // <-- Alias
```

Features
--------

- Simple to use, no more you don't need
- Relative requires from specified basedir
- Resolve external warnings from bundlers (Webpack, Rollup, etc.)
- Higher performance (no new `Module` will be created)
- No dependencies
- Compatible with Node v4 (v4.8.4 tested)

API
---

### `_require(request)` (default export)

> ###### Same as `require()`, but resolve external problems from bundlers

### `.require(request)`

> ###### Alias of `_require()`

### `.resolve(request)`

> ###### Same as `require.resolve()`

### `.from(basedir)`

> ###### Create a new `native-require` instance but looksup modules from `basedir`

One `basedir` only create instance once, so never worry about used like

```javascript
_require.from(modelDir).require('./user')
_require.from(modelDir).require('./post')
_require.from(modelDir).require('./comment')
```
