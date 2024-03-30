import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets'
import { UserService } from './user.service'
import mongoose from 'mongoose'
import { UseGuards } from '@nestjs/common'
import { JwtWebsocketGuard } from 'src/auth/jwt-websocket.guard'
import { Socket } from 'socket.io'
import { JwtService } from '@nestjs/jwt'

@WebSocketGateway({})
export class UserGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly userService: UserService, private jwtService: JwtService) { }
    async handleDisconnect(client: Socket) {
        try {
            const token = client.handshake.headers.authorization.split(' ')[1]

            if (token) {
                const user = this.jwtService.verify(token)
                await this.userService.changeUserStatus(user.id, false)
            }
        } catch (error) {

        }
    }
    async handleConnection(client: Socket) {
        try {
            const token = client.handshake.headers.authorization.split(' ')[1]

            if (token) {
                const user = this.jwtService.verify(token)
                await this.userService.changeUserStatus(user.id, true)

            }
        } catch (error) {

        }

    }




    @SubscribeMessage('addFriend')
    async addFriend(@MessageBody() data: { friend_id: mongoose.Schema.Types.ObjectId; user_id: mongoose.Schema.Types.ObjectId }) {

        return await this.userService.addFriend(data.friend_id, data.user_id)
    }

    @UseGuards(JwtWebsocketGuard)
    @SubscribeMessage('getUserFriends')
    async getUserFriends(socket: Socket) {
        try {
            const data = socket['user']

            return await this.userService.getUserFriends(data.id)
        } catch (error) {
            socket.emit('error', error.message)
        }
    }
}
