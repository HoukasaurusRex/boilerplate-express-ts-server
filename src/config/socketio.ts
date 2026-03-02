import type { ServerOptions } from 'socket.io'

export default {
  transports: ['websocket'],
} as Partial<ServerOptions>
