import { Server } from 'socket.io'
import { socketIOOptions } from './config/index.ts'
import sockets from './controllers/v1/sockets.ts'

// https://socket.io/docs/server-api/
const io = new Server(socketIOOptions)

io.on('connection', sockets(io))

export default io
