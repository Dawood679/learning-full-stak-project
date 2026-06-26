import { io } from "socket.io-client"

let socket = null

export function getSocket(userId) {
  if (!socket) {
    socket = io({
      path: "/api/socket",
      auth: { userId },
      reconnection: true,
      reconnectionDelay: 3000,
    })
  }
  return socket
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}
