import {Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, UseGuards} from '@nestjs/common';
import {PostsService} from "./posts.service";
import {CreatePostsDto, UpdatePostDto} from "./dto/Posts.dto";
import {AuthenticatedGuard} from "../auth/utils/Authenticated.guard";

@Controller('posts')
export class PostsController {
    constructor(@Inject('POSTS_SERVICES') private readonly postsServices: PostsService){}
    @UseGuards(AuthenticatedGuard)
    @Post()
    createPost(@Body() dto: CreatePostsDto){
       return this.postsServices.createPost(dto)
    }


    @Get()
    getAll(){
        return this.postsServices.getAll()
    }



    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number){
        return this.postsServices.getOne(id)
    }

    // @UseGuards(AuthenticatedGuard)
    @Delete(':id')
    deleteOne(@Param('id', ParseIntPipe) id: number){
       return this.postsServices.deleteOne(id)
    }

    @UseGuards(AuthenticatedGuard)
    @Put(':id')
    updateOne(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePostDto){
         return this.postsServices.updateOne(id, dto)
    }

}
