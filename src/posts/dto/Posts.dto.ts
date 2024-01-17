import {IsNotEmpty} from "class-validator";

export class CreatePostsDto{
    @IsNotEmpty()
    id: number

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
}

export class UpdatePostDto{
    title: string
    description: string
}