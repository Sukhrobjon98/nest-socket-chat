import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { UserModule } from './user/user.module'
import { MessagesModule } from './messages/messages.module';


@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost/nest'),
        AuthModule,
        ConfigModule.forRoot({ isGlobal: true }),
        UserModule,
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '5m' },
        }),
        MessagesModule
    ],
   
})
export class AppModule { }
