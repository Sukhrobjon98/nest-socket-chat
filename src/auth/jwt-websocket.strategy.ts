// import { Injectable } from "@nestjs/common";
// import { ConfigService } from "@nestjs/config";
// import { PassportStrategy } from "@nestjs/passport";
// import mongoose from "mongoose";
// import { ExtractJwt } from "passport-jwt";
// import { Strategy } from "passport-local";




// export interface payloadType {
//     id: mongoose.Types.ObjectId,
//     username: String,
// }


// @Injectable()
// export class JwtWebsocketStrategy extends PassportStrategy(Strategy, 'jwt-websocket') {
//     constructor(private configService: ConfigService) {
//         super({
//             jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
//             ignoreExpiration: false,
//             secretOrKey: configService.get('JWT_SECRET'),
//         })
//     }

//     async validate(payload: payloadType) {
//         return payload;
//     }
// }