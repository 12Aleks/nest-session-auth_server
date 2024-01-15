import {
    Body,
    ClassSerializerInterceptor,
    Controller, Get,
    Inject,
    Post,
    Req,
    Res,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { RegistrationDto} from "./dto/Auth.dto";
import {AuthService} from "./auth.service";
import {UsersService} from "../users/users.service";
import {ResponseUserData} from "../users/types/types";
import {Request, Response} from 'express'
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
    async login(@Req() req: Request) {
        return req.user;
    }

    @Get('logout')
    async logout(@Req() req: Request, @Res() res: Response) {
        try {
            await new Promise<void>((resolve, reject) => {
                req.session.destroy((err) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        res.clearCookie('custom_session');
                        req.session = null;
                        resolve();
                    }
                });
            });

            res.json({ msg: 'The user session has ended' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred during logout' });
        }
    }


    @UseGuards(AuthenticatedGuard)
    @Get('protected')
    async getUserStatus(@Req() req: Request){
        return req.user;
    }
}
