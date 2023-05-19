import { Server, Socket } from 'socket.io'

interface ClientToServerEvents {
  'create-ticket': (
    payload: null,
    callback: (ticket: SocketData) => void
  ) => void
  'next-ticket': (
    payload: { name: string; desktop: number },
    callback: (ticket: SocketData | null) => void
  ) => void
  'assign-desktop': (data: string) => void
}

interface ServerToClientEvents {
  'tickets-pending': (data: SocketData[]) => void
}

interface ServerInternalEvents {
  'server-message': () => void
}

interface SocketData {
  id: string
  name: string | null
  desktop: number | null
  ticketNumber: number
}

export type SocketServerInterface = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  ServerInternalEvents,
  SocketData
>

export type SocketInterface = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  ServerInternalEvents,
  SocketData
>
