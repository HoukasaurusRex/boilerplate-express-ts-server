import { Options, Dialect } from 'sequelize'
import { env, dialects } from './enums'
import logger from '../services/logger'
import environment from './env'

const validDialects = Object.values(dialects)

const getDialect = (dialect?: unknown): Dialect =>
  validDialects.find((d) => d === dialect) || dialects.PSQL

const devOptions: Options = {
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'postgres',
  host: process.env.DB_HOSTNAME || 'localhost',
  port: (process.env.DB_PORT && Number(process.env.DB_PORT)) || 5432,
  dialect: getDialect(process.env.DB_DIALECT),
  logging: (msg) => logger.debug(msg),
  ssl: false,
  pool: {
    max: 20,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}

const testOptions: Options = {
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'postgres',
  host: process.env.DB_HOSTNAME || 'localhost',
  port: (process.env.DB_PORT && Number(process.env.DB_PORT)) || 5432,
  dialect: getDialect(process.env.DB_DIALECT),
  logging: (msg) => logger.debug(msg),
  ssl: false,
  pool: {
    max: 20,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}

const prodOptions: Options = {
  username: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB_NAME,
  host: process.env.RDS_HOSTNAME,
  port: (process.env.DB_PORT && Number(process.env.DB_PORT)) || 5432,
  dialect: getDialect(process.env.DB_DIALECT),
  logging: (msg) => logger.debug(msg),
  ssl: false,
  pool: {
    max: 20,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}

const options = {
  [env.DEV]: devOptions,
  [env.TEST]: testOptions,
  [env.PROD]: prodOptions,
} as const

export default options[environment]
