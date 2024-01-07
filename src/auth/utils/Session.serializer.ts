import {Inject, Injectable} from "@nestjs/common";
import {PassportSerializer} from "@nestjs/passport";
import {UsersService} from "../../users/users.service";


@Injectable()
export class SessionSerializer extends PassportSerializer{

    constructor(@Inject("USERS_SERVICE") private readonly userServices: UsersService ) {
        super();
    }
    serializeUser(user: any, done: Function): any {
        done(null, user)
    }

    async deserializeUser(user: any, done: Function): Promise<any> {
        const userInDB = await this.userServices.getOneById(user.id)
        return userInDB ? done(null, user): done(null, null)
    }
}