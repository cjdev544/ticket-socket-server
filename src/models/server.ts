import express, { Application } from 'express'
import { createServer, Server as HttpServer } from 'http'
import { Server as WebSocketServer } from 'socket.io'
import cors from 'cors'
import morgan from 'morgan'
import { SocketServerInterface } from '../interfaces/socket'
import Socket from './socket'

class Server {
  private socket: Socket
  constructor(
    private port: string = process.env.PORT || '3000',
    private app: Application = express(),
    private server: HttpServer = createServer(app),
    private io = new WebSocketServer<SocketServerInterface>(server)
  ) {
    this.socket = new Socket(this.io)
    this.middlewares()
  }

  private middlewares() {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(morgan('dev'))

    this.app.get('/tickets', (_req, res) => {
      res.status(200).json({ tickets: this.socket.ticketList.last13Tickets })
    })
  }

  listen() {
    this.server.listen(this.port, () =>
      console.log(`Server listening on port ${this.port}`)
    )
  }
}

export default Server
