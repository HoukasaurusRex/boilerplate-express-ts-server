import Umzug from 'umzug'
import { umzugOptions } from './config'
import logger from './services/logger'

// https://www.npmjs.com/package/umzug
const umzug = new Umzug(umzugOptions)

;(async () => {
  await umzug.up()
  logger.info('All migrations performed successfully')
  process.exit()
})().catch((error) => {
  logger.error(error)
  process.exit(1)
})
