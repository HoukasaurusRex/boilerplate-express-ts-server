import { Socket } from 'socket.io'
import logger from '../../services/logger'

type Done = (...args: any[]) => void
export default class SocketsProvider {
  private socket: Socket
  constructor(socket: Socket) {
    this.socket = socket
  }
  public onChatMessage(msg: string, _done: Done): void {
    this.socket.broadcast.emit('chat message', msg)
  }
  public onDisconnect(msg: string): void {
    logger.log('Disconnect', msg)
  }
  public onError(err: Error): void {
    logger.log('socket: ', err)
  }
}
