import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get, HttpException, HttpStatus,
    Inject,
    Post,
    UseInterceptors,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/CreateUser.dto";
import {IUser, ResponseUserData} from "./types/types";
import {use} from "passport";

@Controller('users')
export class UsersController {
    constructor(@Inject('USERS_SERVICE') private readonly usersService: UsersService) {}

    @Post('create')
    @UsePipes(ValidationPipe)
    createUser(@Body() dto: CreateUserDto): Promise<IUser>{
        return this.usersService.createUser(dto)
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    async getAllUsers(): Promise<ResponseUserData[] | HttpException>{
        const users: IUser[] = await this.usersService.getAllUsers();

        if(users) return users.map(user => new ResponseUserData(user));

        else throw new HttpException('User list not found', HttpStatus.NOT_FOUND);
    }
}
