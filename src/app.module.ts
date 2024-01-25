import {MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
//import config module for .env
import { ConfigModule } from '@nestjs/config';

//database
import {TypeOrmModule} from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import * as process from "process";
import entries from "./typeorm";
import {PassportModule} from "@nestjs/passport";
import { PostsModule } from './posts/posts.module';
import {UpdateMaxAgeMiddleware} from "./auth/utils/UpdateMaxAgeMiddleware.middleware";


@Module({
  imports: [
    //env
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [...entries],
      synchronize: true,
    }),
    AuthModule,
    PassportModule.register({
      //passport has been connected with the session
      session: true
    }),
    PostsModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(UpdateMaxAgeMiddleware)
        .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
