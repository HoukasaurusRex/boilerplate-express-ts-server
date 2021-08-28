import express from 'express'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import cors from 'cors'
import compression from 'compression'
import jsend from 'jsend'
import * as router from './routes'
import { notFound, handleError } from './providers/v1/errors'
import { httpLogger } from './services/logger'
import { environment, expressPort as port } from './config'

// https://expressjs.com/en/5x/api.html
const app = express()

// Add some custom middleware functions here
// If this part gets too large, you can move them to "./services/"
const upload = multer({ dest: 'uploads/' })

app.use(cors()) // Allow cors requests https://www.npmjs.com/package/cors
app.use(httpLogger(environment)) // Log HTTP requests with morgan and winston
app.use(express.json()) // Parses json requests
app.use(express.urlencoded({ extended: true })) // Parses application/xwww- forms
app.use(upload.array()) // Parses multipart/form-data forms https://www.npmjs.com/package/multer
app.use(cookieParser()) // Parses cookies
app.use(helmet()) // Send basic HTTP security res headers https://www.npmjs.com/package/helmet
app.use(compression()) // Compresses response with gzip https://www.npmjs.com/package/compression
app.use(jsend.middleware) // Normalizes response body with jsend standard https://www.npmjs.com/package/jsend
app.use('/v1/', router.v1) // Attach versioned router https://expressjs.com/en/5x/api.html#router
app.use('/', router.v1) // Default to the latest api version if desired
app.use('*', notFound) // Catch any unhandled responses and send a custom 404 response
app.use(handleError) // Attach a global error handler at the end https://expressjs.com/en/guide/error-handling.html
app.set('port', port)

export default app
