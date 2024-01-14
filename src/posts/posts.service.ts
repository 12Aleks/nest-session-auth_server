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


    async createPost( dto: CreatePostsDto){
        const findUserByID = await this.userRepository.findOneBy({id: dto.id})
        if(!findUserByID) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

        const newPost = this.postsRepository.create({
            ...dto,
             user: {
                id: findUserByID.id,
                username: findUserByID.username
             }
        })

        return this.postsRepository.save(newPost)
    }

    async getAll(){
        return await this.postsRepository.find(
            //return 'user data', only id and username
            {relations: ['user'], select: {
                user: {
                    id: true,
                    username: true
                }
            }})
    }

    async getOne(id: number){
        return await this.postsRepository.findOne({
            //find one by id and returned with the user model, only id and username fields
            where: {id},
            relations: ["user"],
            select: {
                id: true,
                title: true,
                description: true,
                user: {
                    id: true,
                    username: true
                }
             }
            }
        );
    }
}
