native-require
==============
*Resolve requires in easy way*

Getting started
---------------

```sh
$ npm install native-require --save-dev
```

#### Require or Resolve from where you want

```javascript
import nrequire from 'native-require'

// Normal use but helpful to require externals
const axios = nrequire('axios')

// Require from specified basedir
const model = nrequire.from('./src/model')

const User = model('./user')
const Production = model.require('./production') // <-- Alias
```

API
---

- `nrequire(request)`

- `.require(request)`

- `.resolve(request)`

- `.from(basedir)`
