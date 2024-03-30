import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { GetMessagesDto } from './dto/get-messages.dto';
import { Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway()
export class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  clinets = new Set()
  constructor(private readonly messagesService: MessagesService,
    private jwtService: JwtService) { }


  async handleConnection(client: Socket) {

    let token = client.handshake.headers.authorization.split(' ')[1];
    let user = this.jwtService.verify(token);
    this.clinets.add({ user_id: user.id, id: client.id });

    client.broadcast.emit('userConnected', user.id);

  }

  async handleDisconnect(socket: Socket) {
    this.clinets.forEach((client: {
      user_id: string,
      id: string

    }) => {
      socket.broadcast.emit('userDisconnected', client.user_id);
  
      if (client.id == client.id) {
        this.clinets.delete(client);
      }
    })
  }

  @SubscribeMessage('sendMessage')
  async sendMessage(@MessageBody() createMessageDto: CreateMessageDto, @ConnectedSocket() socket: Socket) {
    this.clinets.forEach((client: {
      user_id: string,
      id: string

    }) => {
      if (client.user_id == createMessageDto.receiver) {
        socket.to(client.id).emit('newMessage', createMessageDto);
      }
      else if (client.user_id == createMessageDto.sender) {
        socket.to(client.id).emit('newMessage', createMessageDto);
      }
    })



    return this.messagesService.create(createMessageDto);
  }



  @SubscribeMessage('getMessages')
  async getMessages(@MessageBody() data: GetMessagesDto) {

    return this.messagesService.findAll(data);
  }


}
