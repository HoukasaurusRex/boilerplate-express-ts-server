import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import compression from 'compression'
import routes from './routes'
import db from './db'
import io from './io'

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(compression())

routes(app)

export default app
