import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Document, mongo } from 'mongoose'

@Schema()
export class User extends Document {
    @Prop({
        unique: true,
    })
    username: string

    @Prop()
    image?: string

    @Prop()
    password: string

    @Prop({
        default: false,
    })
    status: boolean

    // add friends

    @Prop({
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        ref: 'User',
    })
    friends: User[]
}

export const UserSchema = SchemaFactory.createForClass(User)
