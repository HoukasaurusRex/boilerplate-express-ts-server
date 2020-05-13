import socketsProvider from '../providers/sockets'

const sockets = (io) => (socket) => {
  socket.on('chat message', socketsProvider.onChatMessage)
  socket.on('disconnect', socketsProvider.onDisconnect)
  socket.on('error', socketsProvider.onError)
}

export default sockets