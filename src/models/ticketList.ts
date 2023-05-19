import Ticket from './ticket'

class TicketList {
  constructor(
    private lastNumber: number = 0,
    private earrings: Ticket[] = [],
    private assigned: Ticket[] = []
  ) {}

  get nextTicketNumber() {
    this.lastNumber++
    return this.lastNumber
  }

  get last13Tickets() {
    return this.assigned.slice(0, 13)
  }

  createTicket() {
    const newTicket = new Ticket(this.nextTicketNumber)
    this.earrings.push(newTicket)
    return newTicket
  }

  assignTicket(name: string, desktop: number) {
    if (this.earrings.length === 0) return null

    const ticket = this.earrings.shift() as Ticket
    ticket.name = name
    ticket.desktop = desktop
    this.assigned.unshift(ticket)
    return ticket
  }
}

export default TicketList
