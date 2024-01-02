import {IsEmail, IsNotEmpty, MinLength} from "class-validator";


export class CreateUserDto{

    @MinLength(5)
    password: string;

    @MinLength(3)
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}