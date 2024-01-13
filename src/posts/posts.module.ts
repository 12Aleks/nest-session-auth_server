import {Module} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User, Post} from "../typeorm";
import {UsersService} from "../users/users.service";

@Module({
  imports: [TypeOrmModule.forFeature([User, Post])],
  providers: [{
    provide: 'POSTS_SERVICES',
    useClass: PostsService
  },{
    provide: 'USERS_SERVICES',
    useClass: UsersService
  }

  ],
  controllers: [PostsController]
})
export class PostsModule {}
