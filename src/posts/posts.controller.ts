import {Body, Controller, Inject, Param, ParseIntPipe, Post} from '@nestjs/common';
import {PostsService} from "./posts.service";
import {CreatePostsDto} from "./dto/Posts.dto";

@Controller('posts')
export class PostsController {
    constructor(@Inject('POSTS_SERVICES') private readonly postsServices: PostsService){}

    @Post(':id')
    createPost(@Param('id', ParseIntPipe) id: number, @Body() dto: CreatePostsDto){
       console.log(id)
       return this.postsServices.createPost(id, dto)
    }
}
