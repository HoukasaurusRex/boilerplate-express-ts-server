import { Sequelize } from 'sequelize'
import config from './config/db'
import Users from './models/Users'

// https://sequelize.org/master/index.html
const sequelize = new Sequelize(config[process.env.NODE_ENV || 'development'])

Users.init(sequelize)

export default sequelize