import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {AuthDto} from "./dto/Auth.dto";
import {IUser} from "../users/types/types";
import {comparePassword} from "../utils/bcrypt";


@Injectable()
export class AuthService {
    constructor(@Inject("USERS_SERVICE") private readonly usersService: UsersService){}

    async validateUser(email: string, password: string){
       console.log(password, email)
       const candidate: IUser = await this.usersService.getOneByEmail(email)
       if(!candidate) throw new HttpException('User not exist', HttpStatus.NOT_FOUND);

       const checkPassword = await comparePassword(password, candidate.password);
       if(!checkPassword) throw new HttpException('The password is not correct', HttpStatus.UNAUTHORIZED);

       if(candidate && checkPassword){
           return {
               id: candidate.id,
               username: candidate.username,
               created_at: candidate.created_at
           }
       }
        return null;

    }
}
