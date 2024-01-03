import {Exclude} from "class-transformer";


export class IUser{
    id: number;
    password: string;
    username: string;
    email: string;
    created_at: Date;
    updated_at: Date;
}

export class ResponseUserData {
    id?: number;

    @Exclude()
    password: string;

    username: string;
    email: string;

    @Exclude()
    created_at: Date;

    @Exclude()
    updated_at: Date;


    constructor(partial: Partial<ResponseUserData>) {
        Object.assign(this, partial)
    }
}