import test from 'ava'
import { join } from 'path'
import nrequire from '../index'
import packageJson from '../package.json'

const version = packageJson.version

test('Simple test', t => {
  t.notThrows(nrequire('chalk'))
  t.is(nrequire.resolve('chalk'), require.resolve('chalk'))
})

test('Default basedir', t => {
  const fixture = nrequire.from('./fixtures')

  t.is(fixture.require('./gotcha'), 'Gotcha!')
  t.is(fixture.resolve('./gotcha'), require.resolve('./fixtures/gotcha'))
})
