import { v4 } from 'uuid'

class Ticket {
  id: string
  name: string | null
  desktop: number | null
  ticketNumber: number

  constructor(number: number) {
    this.id = v4()
    this.name = null
    this.desktop = null
    this.ticketNumber = number
  }
}

export default Ticket
