import { Server } from 'socket.io'
import { socketIOOptions } from './config'
import sockets from './controllers/v1/sockets'

// https://socket.io/docs/server-api/
const io = new Server(socketIOOptions)

io.on('connection', sockets(io))

export default io
