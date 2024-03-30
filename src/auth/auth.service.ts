import { Injectable } from '@nestjs/common'
import { CreateAuthDto } from './dto/create-auth.dto'
import { UpdateAuthDto } from './dto/update-auth.dto'
import { UserService } from 'src/user/user.service'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async register(createAuthDto: CreateAuthDto) {
        const user = await this.userService.createUser(createAuthDto)

        if (!user) {
            return {
                message: 'User already exists',
                status: 400,
            }
        }
        return {
            user: {
                username: user.username,
                _id: user._id,
            },
            token: this.jwtService.sign({ id: user._id, username: user.username }),
        }
    }

    async login(createAuthDto: CreateAuthDto) {

        const user = await this.userService.finUserByUsername(createAuthDto?.username)

        if (!user) {
            return {
                message: "Password or username is incorrect",
                status: 401,
            }
        }

        if (user.password != createAuthDto.password) {
            return {
                message: 'Invalid password',
                status: 401,
            }
        }
        return {
            user: {
                username: user.username,
                _id: user._id,
            },
            status: 200,
            token: this.jwtService.sign({ id: user._id, username: user.username }),
        }
    }


}
