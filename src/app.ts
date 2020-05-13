import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import compression from 'compression'
import routes from './routes'
import logger from './services/logger'

// https://expressjs.com/en/5x/api.html
const app = express()

const logLevel = (env) => {
  switch (env) {
    case 'production':
      return morgan('combined', {
        stream: { write: message => logger.info(message) }
      })
    case 'test':
      return (_req, _res, next) => next()
    default:
      return morgan('dev')
  }
}

app.use(logLevel(process.env.NODE_ENV))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(compression())

routes(app)

export default app
