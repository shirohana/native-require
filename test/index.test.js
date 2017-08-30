import test from 'ava'
import { dirname, join } from 'path'
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

test('Relative basedir', t => {
  const fixture = nrequire.from('./fixtures')

  t.is(fixture.require('./gotcha'), 'Gotcha!')
  t.is(fixture.resolve('./gotcha'), require.resolve('./fixtures/gotcha'))
})

test('Absolute basedir', t => {
  const fixture = nrequire.from(join(__dirname, 'fixtures'))

  t.is(fixture.require('./gotcha'), 'Gotcha!')
  t.is(fixture.resolve('./gotcha'), require.resolve('./fixtures/gotcha'))
})

test('Cached from', t => {
  let nr1 = nrequire.from('./fixtures')
  let nr2 = nrequire.from(join(__dirname, './fixtures'))
  t.true(nr1 === nr2)

  nr1 = nrequire.from('..')
  nr2 = nrequire.from(dirname(__dirname))
  t.true(nr1 === nr2)
})
