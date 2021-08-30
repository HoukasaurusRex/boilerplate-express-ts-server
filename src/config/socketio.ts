import { ServerOptions } from 'socket.io'

export const socketIOOptions: Partial<ServerOptions> = {
  transports: ['websocket'],
}
