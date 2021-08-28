import { Sequelize } from 'sequelize'
import { dbConfig } from './config'
import { UserFactory } from './models/Users'

// https://sequelize.org/master/index.html
const sequelize = new Sequelize(dbConfig)

export const Users = UserFactory(sequelize)

export default sequelize
