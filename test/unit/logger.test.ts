import { expect } from 'chai'
import logger from '../../src/services/logger'

describe('[SERVICES]: logger', () => {
  it('logger.info should be a function', () => {
    expect(logger.info instanceof Function).to.equal(true)
  })

  it('logger.error should be a function', () => {
    expect(logger.error instanceof Function).to.equal(true)
  })

  it('logger.debug should be a function', () => {
    expect(logger.debug instanceof Function).to.equal(true)
  })

  it('logger.warn should be a function', () => {
    expect(logger.warn instanceof Function).to.equal(true)
  })

  it('logger.silly should be a function', () => {
    expect(logger.silly instanceof Function).to.equal(true)
  })

  it('logger.verbose should be a function', () => {
    expect(logger.verbose instanceof Function).to.equal(true)
  })

  it('logger.http should be a function', () => {
    expect(logger.http instanceof Function).to.equal(true)
  })
})

