import { describe, it } from 'node:test'
import assert from 'node:assert'
import logger from '../../src/services/logger.ts'

describe('[SERVICES]: logger', () => {
  it('logger.info should be a function', () => {
    assert.strictEqual(typeof logger.info, 'function')
  })

  it('logger.error should be a function', () => {
    assert.strictEqual(typeof logger.error, 'function')
  })

  it('logger.debug should be a function', () => {
    assert.strictEqual(typeof logger.debug, 'function')
  })

  it('logger.warn should be a function', () => {
    assert.strictEqual(typeof logger.warn, 'function')
  })

  it('logger.silly should be a function', () => {
    assert.strictEqual(typeof logger.silly, 'function')
  })

  it('logger.verbose should be a function', () => {
    assert.strictEqual(typeof logger.verbose, 'function')
  })

  it('logger.http should be a function', () => {
    assert.strictEqual(typeof logger.http, 'function')
  })
})
