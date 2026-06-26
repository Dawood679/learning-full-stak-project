"use client"

import { useEffect } from "react"
import { getSocket, disconnectSocket } from "@/lib/socket-client"

export function PresenceTracker({ userId }) {
  useEffect(() => {
    if (!userId) return

    const socket = getSocket(userId)

    const pingInterval = setInterval(() => {
      socket.emit("ping")
    }, 30_000)

    return () => {
      clearInterval(pingInterval)
      disconnectSocket()
    }
  }, [userId])

  return null
}
