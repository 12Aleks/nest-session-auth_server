import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
import {HttpException, HttpStatus, Inject, Injectable} from "@nestjs/common";
import {AuthService} from "../auth.service";
import {AuthDto} from "../dto/Auth.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
   constructor(@Inject("AUTH_SERVICE") private readonly authService: AuthService){
       super({
           usernameField: 'email',
           passwordField: 'password',
       })
   }

   async validate(email: string, password: string){
       console.log('Strategy', password, email)
       const userData = await this.authService.validateUser(email, password);
       if(!userData) throw new HttpException('User not found or password is incorrect', HttpStatus.UNAUTHORIZED);

       return userData;
   }
}