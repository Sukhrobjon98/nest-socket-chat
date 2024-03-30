import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './entities/message.entity';
import { Model } from 'mongoose';
import { GetMessagesDto } from './dto/get-messages.dto';

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message.name) private messageModel: Model<Message>) { }
  create(createMessageDto: CreateMessageDto) {
    let message = new this.messageModel(createMessageDto)

    
    return message.save()
  }


  async findAll(data: GetMessagesDto) {

    let { sender, receiver } = data
    //how to get messages between two users
    return this.messageModel.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender }
      ]
    }).exec()

  }


}
