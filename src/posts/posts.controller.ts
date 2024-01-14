import {Body, Controller, Get, Inject, Param, ParseIntPipe, Post, UseGuards} from '@nestjs/common';
import {PostsService} from "./posts.service";
import {CreatePostsDto} from "./dto/Posts.dto";
import {AuthenticatedGuard} from "../auth/utils/Authenticated.guard";

@Controller('posts')
export class PostsController {
    constructor(@Inject('POSTS_SERVICES') private readonly postsServices: PostsService){}

    @Post()
    createPost(@Body() dto: CreatePostsDto){
       return this.postsServices.createPost(dto)
    }

    @UseGuards(AuthenticatedGuard)
    @Get()
    getAll(){
        return this.postsServices.getAll()
    }

    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number){
        return this.postsServices.getOne(id)
    }

}
