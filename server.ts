#!/usr/bin/env node

import debug from 'debug'
import http from 'http'
import app from './src/app'
import io from './src/io'
import db from './src/db'

const normalizePort = (val) => {
  const port = parseInt(val, 10)
  if (isNaN(port)) {
    return val
  }
  if (port >= 0) {
    return port
  }
  return false
}

const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

const server = http.createServer(app)

const getBind = (address) => typeof address === 'string'
    ? `pipe ${address}`
    : `port ${address?.port}`

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = getBind(port)

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
    default:
      throw error
  }
}

const onListening = () => {
  const addr = server.address()
  const bind = getBind(addr)
  console.log(`Listening on ${bind}`)
}

db.sync().then(() => {
  io.attach(server)
  
  server.listen(port)
  server.on('error', onError)
  server.on('listening', onListening)
})

  