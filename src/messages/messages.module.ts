import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from './entities/message.entity';

@Module({
  providers: [MessagesGateway, MessagesService],
  imports: [MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }])],
})
export class MessagesModule { }
