export default {
  onChatMessage(msg, done) {
    // this = socket
    this.broadcast.emit('chat message', msg)
  },
  onDisconnect(msg, done) {
    console.log('Disconnect', msg)
  },
  onError(err) {
    console.log('socket: ', err)
  }
}