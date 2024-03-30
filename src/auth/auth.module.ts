import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGateway } from './auth.gateway';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtWebsocketGuard } from './jwt-websocket.guard';

@Module({
    providers: [AuthGateway, AuthService, JwtWebsocketGuard],
    imports: [UserModule, JwtModule.registerAsync({
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
            secret: configService.get('JWT_SECRET'),
            signOptions: { expiresIn: '1d' },
        }),
    })],
})
export class AuthModule { }
