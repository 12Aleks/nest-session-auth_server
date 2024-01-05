import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UsersService} from "../users/users.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../typeorm";
import {LocalStrategy} from "../utils/LocalStrategy";
import {PassportModule} from "@nestjs/passport";
import { AuthController } from './auth.controller';

@Module({
    imports: [
       TypeOrmModule.forFeature([User]),
       PassportModule
    ],
    providers: [
        {
            provide: 'AUTH_SERVICE',
            useClass: AuthService
        },
        {
            provide: 'USERS_SERVICE',
            useClass: UsersService
        },
        LocalStrategy
    ],
    controllers: [AuthController],
})
export class AuthModule {}
