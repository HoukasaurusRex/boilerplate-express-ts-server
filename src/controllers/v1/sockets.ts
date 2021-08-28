import { Server, Socket } from 'socket.io'
import SocketsProvider from '../../providers/v1/sockets'

const sockets =
  (_io: Server) =>
  (socket: Socket): void => {
    const socketsProvider = new SocketsProvider(socket)
    socket.on('chat_message', socketsProvider.onChatMessage)
    socket.on('disconnect', socketsProvider.onDisconnect)
    socket.on('error', socketsProvider.onError)
  }

export default sockets
