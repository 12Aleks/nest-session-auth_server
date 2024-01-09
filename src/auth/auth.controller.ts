import {
    Body,
    ClassSerializerInterceptor,
    Controller, Get,
    Inject,
    Post,
    Request,
    Response,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { RegistrationDto} from "./dto/Auth.dto";
import {AuthService} from "./auth.service";
import {UsersService} from "../users/users.service";
import {ResponseUserData} from "../users/types/types";
import {Request as Req, Response as Res} from 'express'
import {AuthenticatedGuard} from "./utils/Authenticated.guard";
import {LocalAuthGuard} from "./utils/Local.auth.guard";
import process from "process";

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

    //with passport
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req: Req) {
        return req.user;
    }

    @Get('logout')
    async logout(@Request() req: Req){
        req.session.destroy(function (err){
            if(err){
                console.log(err);
            }else{
                req.session = null;
                // res.clearCookie('custom_session', {
                //     path: '/', // Match the path used when setting the cookie
                //     httpOnly: true, // Match other cookie options if set during initialization
                //     sameSite: "lax",
                // });

            }
        });
        return {msg: 'The user session has ended'}
    }


    @UseGuards(AuthenticatedGuard)
    @Get('protected')
    async getUserStatus(@Request() req: Req){
        return req.user;
    }
}
