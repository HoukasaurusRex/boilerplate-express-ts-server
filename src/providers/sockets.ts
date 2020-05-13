import logger from '../services/logger'

export default {
  onChatMessage(msg, done) {
    // this = socket
    this.broadcast.emit('chat message', msg)
  },
  onDisconnect(msg, done) {
    logger.log('Disconnect', msg)
  },
  onError(err) {
    logger.log('socket: ', err)
  }
}