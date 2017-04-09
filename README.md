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
import { join } from 'path'
import nrequire from 'native-require'

// TODO Update example
export default function (name) {
  let filename = join(__dirname, name)
  return nrequire(filename)
}
```

## API
- `require(path: String)` : Just like _require()_
- `require.resolve(request: String)` : Just like _require.resolve()_
