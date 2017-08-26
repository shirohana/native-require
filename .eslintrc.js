module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 5,
    sourceType: 'module'
  },
  env: {
    node: true
  },
  extends: 'es5',
  rules: {
    'space-before-function-paren': ['error', 'always']
  }
}
