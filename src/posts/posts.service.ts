import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Post, User} from "../typeorm";
import {CreatePostsDto, UpdatePostDto} from "./dto/Posts.dto";


@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post) private postsRepository: Repository<Post>,
        @InjectRepository(User) private  userRepository: Repository<User>
    ){}


    async createPost( dto: CreatePostsDto){


        const findUserByID = await this.userRepository.findOneBy({id: dto.id})

        if(!findUserByID) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

        console.log(findUserByID)

        const newPost = this.postsRepository.create({
             title: dto.title,
             description: dto.description,
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
         const post =  await this.postsRepository.findOne({
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
        if(!post) throw new HttpException(`The post with id: ${id} not found`, HttpStatus.NOT_FOUND);

        return post
    }

    async deleteOne(id: number){
        const postToDelete = await this.postsRepository.findOne({
            where: {id},
            relations: ['user'],
        });

        if (!postToDelete) {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }

        await this.postsRepository.remove(postToDelete);

        return {msg: `Post with ${ id } has been deleted`}

    }


    async updateOne(id: number, dto: UpdatePostDto){
        const post = await this.postsRepository.findOneBy({id});
        if (!post) throw new NotFoundException(`Post with id ${id} not found`);

        // Update the post properties
        post.title = dto.title || post.title;
        post.description = dto.description || post.description;

        await this.postsRepository.save(post);

        return post;
    }
}
