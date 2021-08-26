import { Sequelize } from 'sequelize'
import config from './config/db'
import { UserFactory } from './models/Users'

const dbConfig =
  config[process.env.NODE_ENV || 'development'] || config.development
// https://sequelize.org/master/index.html
const sequelize = new Sequelize(dbConfig)

export const Users = UserFactory(sequelize)

export default sequelize
