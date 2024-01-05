import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
import {HttpException, HttpStatus, Inject, Injectable} from "@nestjs/common";
import {AuthService} from "../auth/auth.service";
import {AuthDto} from "../auth/dto/Auth.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
   constructor(@Inject("AUTH_SERVICE") private readonly authService: AuthService){
       super()
   }

   async validate(dto: AuthDto){
       const userData = await this.authService.validateUser(dto);
       if(!userData) throw new HttpException('User not found or password is incorrect', HttpStatus.UNAUTHORIZED);

       return userData;
   }
}