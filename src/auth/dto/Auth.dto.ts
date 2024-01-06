import {IsEmail, IsNotEmpty, MinLength} from "class-validator";

export class AuthDto{
    email: string;
    password: string;
}

export class RegistrationDto{
    @MinLength(3)
    username: string;

    @MinLength(5)
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email:string;
}