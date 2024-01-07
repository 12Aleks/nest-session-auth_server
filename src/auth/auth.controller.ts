import {
    Body,
    ClassSerializerInterceptor,
    Controller, Get,
    Inject,
    Post,
    Request,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {AuthDto, RegistrationDto} from "./dto/Auth.dto";
import {AuthService} from "./auth.service";
import {UsersService} from "../users/users.service";
import { AuthGuard } from '@nestjs/passport';
import {ResponseUserData} from "../users/types/types";
import {Request as Req} from 'express'
import {AuthenticatedGuard} from "./utils/Authenticated.guard";
import {LocalStrategy} from "./utils/LocalStrategy";
import {LocalAuthGuard} from "./utils/Local.auth.guard";

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
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req: Req) {
        return req.user;
    }


    @UseGuards(AuthenticatedGuard)
    @Get('protected')
    async getUserStatus(@Request() req: Req){
        return req.user;
    }
}
