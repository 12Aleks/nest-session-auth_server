import {Body, Controller, Inject, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/CreateUser.dto";

@Controller('users')
export class UsersController {
    constructor(@Inject('USERS_SERVICE') private readonly usersService: UsersService) {}

    @Post('create')
    @UsePipes(ValidationPipe)
    createUser(@Body() dto: CreateUserDto){
        console.log(dto)
        return this.usersService.createUser(dto)
    }
}
