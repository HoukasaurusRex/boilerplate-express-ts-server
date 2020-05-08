import indexController from './controllers/index'
import usersController from './controllers/users'

export default (app) => {
  app.use('/', indexController)
  app.use('/users', usersController)
}
