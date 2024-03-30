import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { User } from './user.entity'
import mongoose from 'mongoose'

@Schema()
export class UserFrends extends mongoose.Document {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: User.name,
    })
    user: User

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: User.name,
    })
    frend: User
}

export const UserFrendsSchema = SchemaFactory.createForClass(UserFrends)
