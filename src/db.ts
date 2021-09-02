import { Sequelize } from 'sequelize'
import { sequelizeOptions } from './config'
import { UserFactory } from './models/Users'

// https://sequelize.org/master/index.html
const sequelize = new Sequelize(sequelizeOptions)

export const Users = UserFactory(sequelize)

export default sequelize
