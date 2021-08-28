#!/usr/bin/env node

import http from 'http'
import app from './src/app'
import io from './src/io'
import db from './src/db'
import logger from './src/services/logger'
import { expressPort as port, host } from './src/config'

const server = http.createServer(app)

const onError = (error: NodeJS.ErrnoException) => {
  if (error.syscall !== 'listen') {
    throw error
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(`port ${port} requires elevated privileges`)
      process.exit(1)
    case 'EADDRINUSE':
      logger.error(`port ${port} is already in use`)
      process.exit(1)
    default:
      logger.error(error)
      throw error
  }
}

const onListening = () => {
  logger.info(`Listening at http://${host}:${port}`)
}

db.sync().then(() => {
  io.attach(server)

  server.listen(port)
  server.on('error', onError)
  server.on('listening', onListening)
})
