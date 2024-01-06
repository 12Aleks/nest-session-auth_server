import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Inject,
    Post,
    Request,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {AuthDto, RegistrationDto} from "./dto/Auth.dto";
import {AuthService} from "./auth.service";
import {UsersService} from "../users/users.service";
import {LocalAuthGuard} from "./utils/Local.auth.guard";
import { AuthGuard } from '@nestjs/passport';
import {ResponseUserData} from "../users/types/types";

@Controller('auth')
export class AuthController {
    constructor(@Inject('AUTH_SERVICE') private readonly authService: AuthService,
                @Inject('USERS_SERVICE') private readonly usersService: UsersService) {}


    //return
    @UseInterceptors(ClassSerializerInterceptor)
    @Post('registration')
    async registrationUser(@Body() dto: RegistrationDto){
        const newUser = await this.usersService.createUser(dto);
        return new ResponseUserData(newUser);
    }
    @UseGuards(AuthGuard('local'))
    // @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return req.user;
    }
}
