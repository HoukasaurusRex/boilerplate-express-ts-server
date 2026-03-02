import http from 'http'
import app from './app.ts'
import io from './io.ts'
import logger from './services/logger.ts'
import { expressOptions } from './config/index.ts'

const { host, port } = expressOptions
const server = http.createServer(app)

const onError = (error: NodeJS.ErrnoException) => {
  if (error.syscall !== 'listen') {
    throw error
  }
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      error.message = `port ${port} requires elevated privileges`
      throw error
    case 'EADDRINUSE':
      error.message = `port ${port} is already in use`
      throw error
    default:
      throw error
  }
}

const onListening = () => {
  logger.info(`Express server is listening at http://${host}:${port}`)
}

io.attach(server)
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)
