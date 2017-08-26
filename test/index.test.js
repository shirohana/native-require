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
  if (version.startsWith('1.0')) {
    // Default basedir is process.cwd() below ^1.0.*
    const fixture = nrequire.from('./test/fixtures')

    t.is(fixture('./gotcha'), 'Gotcha!')
    t.is(fixture.resolve('./gotcha'), require.resolve('./fixtures/gotcha'))
  }
})
