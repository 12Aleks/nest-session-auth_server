import {Body, Controller, Post} from '@nestjs/common';
import {AuthDto} from "./dto/Auth.dto";

@Controller('auth')
export class AuthController {
    @Post('registration')
    async registration(){

    }

    @Post('auth')
    async login(@Body() dto: AuthDto){

    }
}
