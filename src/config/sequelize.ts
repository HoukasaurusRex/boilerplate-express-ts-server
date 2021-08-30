import { Options, Dialect } from 'sequelize'
import { enums } from './enums'
import logger from '../services/logger'
import { environment } from './env'

const validDialects = [
  'mysql',
  'postgres',
  'sqlite',
  'mariadb',
  'mssql',
] as const

const getDialect = (dialect?: unknown): Dialect =>
  validDialects.find((d) => d === dialect) || 'postgres'

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
  [enums.DEV]: devOptions,
  [enums.TEST]: testOptions,
  [enums.PROD]: prodOptions,
} as const

export const dbConfig = options[environment]
