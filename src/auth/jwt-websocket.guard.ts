import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'
import { WsException } from '@nestjs/websockets'
import { Socket } from 'socket.io'

@Injectable()
export class JwtWebsocketGuard extends AuthGuard('jwt-websocket') implements CanActivate {
    constructor(private readonly jwtService: JwtService) {
        super()
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const client = context.switchToWs().getClient<Socket>()
            const token = client.handshake.headers['authorization'].split(' ')[1]




            const decoded = await this.jwtService.verify(token)


            client['user'] = decoded


            return true
        } catch (error) {

            const client = context.switchToWs().getClient<Socket>()
            client.emit('error', new UnauthorizedException('Unauthorized'))
            return false
        }
    }
}
