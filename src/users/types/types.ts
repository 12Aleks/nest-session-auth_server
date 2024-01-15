import {Exclude} from "class-transformer";
import {Post} from "../../typeorm";


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

    posts: Post[]


    constructor(partial: Partial<ResponseUserData>) {
        Object.assign(this, partial)
    }
}

export class ResponseUserWithPostsData extends ResponseUserData {
    posts: Post[];

    constructor(partial: Partial<ResponseUserData>) {
        super(partial);
    }
}