import {
    Body,
    ClassSerializerInterceptor,
    Controller, Delete,
    Get, HttpException, HttpStatus,
    Inject, Param, ParseIntPipe,
    Post, Put, UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/CreateUser.dto";
import {IUser, ResponseUserData} from "./types/types";
import {use} from "passport";
import {AuthenticatedGuard} from "../auth/utils/Authenticated.guard";

@Controller('users')
export class UsersController {
    constructor(@Inject('USERS_SERVICE') private readonly usersService: UsersService) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(AuthenticatedGuard)
    @Get()
    async getAllUsers(): Promise<ResponseUserData[] | HttpException>{
        const users: IUser[] = await this.usersService.getAllUsers();

        if(users) return users.map(user => new ResponseUserData(user));

        else throw new HttpException('User list not found', HttpStatus.NOT_FOUND);
    }

    @UseGuards(AuthenticatedGuard)
    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id: number){
        return this.usersService.getOneById(id)
    }
    @UseGuards(AuthenticatedGuard)
    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number){

    }
    @UseGuards(AuthenticatedGuard)
    @Put(':id')
    updateOne(@Param('id', ParseIntPipe) id: number){

    }
}
