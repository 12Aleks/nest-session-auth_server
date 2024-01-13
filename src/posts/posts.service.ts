import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Post, User} from "../typeorm";
import {CreatePostsDto} from "./dto/Posts.dto";

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post) private postsRepository: Repository<Post>,
        @InjectRepository(User) private  userRepository: Repository<User>
    ){}


    async createPost(id: number, dto: CreatePostsDto){
        const findUserByID = await this.userRepository.findOneBy({id})
        if(!findUserByID) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

        const newPost = this.postsRepository.create({
            ...dto,
             user: findUserByID
        })

        return this.postsRepository.save(newPost)
    }
}
