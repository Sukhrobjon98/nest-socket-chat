import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";




@Schema()
export class Message {
    @Prop()
    content: string
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    })
    sender: string
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    })
    receiver: string
    @Prop({
        default: new Date()
    })
    date: Date
    @Prop()
    delivered: boolean
}


export const MessageSchema = SchemaFactory.createForClass(Message)