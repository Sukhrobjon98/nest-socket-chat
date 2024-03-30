import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './entities/user.entity'
import mongoose, { Model } from 'mongoose'

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }
    async createUser(createUserDto: CreateUserDto) {
        const user = await this.userModel.findOne({ username: createUserDto.username })

        if (user) {
            return null
        }

        return (await this.userModel.create(createUserDto)).save()
    }

    async finUserByUsername(username: string) {
        return await this.userModel.findOne({ username })
    }

    async addFriend(friend_id: mongoose.Schema.Types.ObjectId, user_id: mongoose.Schema.Types.ObjectId) {

        const user = await this.userModel.findById(user_id)
        const friend = await this.userModel.findById(friend_id)


        if (!user || !friend) {
            return null
        }

        user.friends.includes(friend_id as any) ? user.friends : user.friends.push(friend_id as any)
        friend.friends.includes(user_id as any) ? friend.friends : friend.friends.push(user_id as any)

        return await user.save()

    }


    async getUserFriends(user_id: mongoose.Schema.Types.ObjectId) {

        const user = await this.userModel.findById(user_id).populate('friends')

        if (!user) {
            return {
                message: 'User not found',
                status: 404,
            }
        }

        return user
    }


    async changeUserStatus(user_id: mongoose.Schema.Types.ObjectId, status: boolean) {
        const user = await this.userModel.findById(user_id).exec()

        if (!user) {
            return {
                message: 'User not found',
                status: 404,
            }
        }

        user.status = status


        return await user.save()
    }
}
