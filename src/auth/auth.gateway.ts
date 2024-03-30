import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets'
import { AuthService } from './auth.service'
import { CreateAuthDto } from './dto/create-auth.dto'
import { Server, Socket } from 'socket.io'
import { UseGuards } from '@nestjs/common'
import { JwtWebsocketGuard } from './jwt-websocket.guard'

@WebSocketGateway({
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
})
export class AuthGateway {
    @WebSocketServer() server: Server
    constructor(private readonly authService: AuthService) { }

    @SubscribeMessage('register')
    async register(@MessageBody() createAuthDto: CreateAuthDto, @ConnectedSocket() socket: Socket) {
        return this.authService.register(createAuthDto)
    }


    @SubscribeMessage('login')
    async login(@MessageBody() createAuthDto: CreateAuthDto, @ConnectedSocket() socket: Socket) {
        return this.authService.login(createAuthDto)
    }
}
