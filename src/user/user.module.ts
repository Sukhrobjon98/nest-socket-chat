import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserGateway } from './user.gateway'
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from './entities/user.entity'
import { JwtModule } from '@nestjs/jwt'

@Module({
    providers: [UserGateway, UserService],
    imports: [
        MongooseModule.forFeature([
            {
                name: 'User',
                schema: UserSchema,
            },

        ]),
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '5m' },
        })
    ],
    exports: [UserService],
})
export class UserModule { }
