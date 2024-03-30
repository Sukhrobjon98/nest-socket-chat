import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@WebSocketGateway()
export class MessagesGateway {
  constructor(private readonly messagesService: MessagesService) { }

  @SubscribeMessage('sendMessage')
  async sendMessage(@MessageBody() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

}
