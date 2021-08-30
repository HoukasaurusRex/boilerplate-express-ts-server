import path from 'path'
import { UmzugOptions } from 'umzug'
import sequelize from '../db'
import logger from '../services/logger'

export const umzugOptions: UmzugOptions = {
  migrations: {
    path: path.join(__dirname, '../migrations'),
    pattern: RegExp('.ts$'),
    params: [sequelize?.getQueryInterface()],
  },
  logging: logger.debug.bind(logger), // https://github.com/winstonjs/winston/issues/1591
  storage: 'sequelize',
  storageOptions: {
    sequelize: sequelize,
  },
}
