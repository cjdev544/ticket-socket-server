import { SocketInterface, SocketServerInterface } from '../interfaces/socket'
import TicketList from './ticketList'

class Socket {
  ticketList: TicketList

  constructor(private io: SocketServerInterface) {
    this.ticketList = new TicketList()
    this.socketEvents()
  }

  private socketEvents() {
    this.io.on('connection', (socket: SocketInterface) => {
      console.log('client connected')

      socket.on('create-ticket', (_, callback) => {
        const newTicket = this.ticketList.createTicket()
        callback(newTicket)
      })

      socket.on('next-ticket', (payload, callback) => {
        const nextTicket = this.ticketList.assignTicket(
          payload.name,
          payload.desktop
        )
        callback(nextTicket)
        this.io.emit('tickets-pending', this.ticketList.last13Tickets)
      })
    })
  }
}

export default Socket
