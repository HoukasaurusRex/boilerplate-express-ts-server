import logger from '../../services/logger'

export default {
  onChatMessage(msg, done): void {
    // @ts-ignore
    this.broadcast.emit('chat message', msg)
  },
  onDisconnect(msg, done): void {
    logger.log('Disconnect', msg)
  },
  onError(err): void {
    logger.log('socket: ', err)
  },
}
