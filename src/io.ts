import Server from 'socket.io'
import sockets from './controllers/v1/sockets'

// https://socket.io/docs/server-api/
const io = new Server({
  // path: '/socket.io',
  // origins: '*',
  // adapter: {}, // defaults to built in adapter https://github.com/socketio/socket.io-adapter
  // parser: {} // defaults to built in parser https://github.com/socketio/socket.io-parser
  transports: ['websocket'],
})

io.on('connection', sockets(io))

export default io
