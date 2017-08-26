import test from 'ava'
import { join } from 'path'
import nrequire from '../index'
import packageJson from '../package.json'

const version = packageJson.version

test('Simple test', t => {
  t.notThrows(nrequire('chalk'))
  t.is(nrequire.resolve('chalk'), require.resolve('chalk'))
})

test('Throw custom Errors', t => {
  const name = 'non-exists-module'
  const basedir = __dirname

  try {
    nrequire('non-exists-module')
    t.fail()
  } catch (err) {
    t.is(err.message,  `Cannot find module '${name}' from '${basedir}'`)
  }

  try {
    nrequire.resolve('non-exists-module')
    t.fail()
  } catch (err) {
    t.is(err.message,  `Cannot find module '${name}' from '${basedir}'`)
  }
})

test('Default basedir', t => {
  const fixture = nrequire.from('./fixtures')

  t.is(fixture.require('./gotcha'), 'Gotcha!')
  t.is(fixture.resolve('./gotcha'), require.resolve('./fixtures/gotcha'))
})
