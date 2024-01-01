import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import config module for .env
import { ConfigModule } from '@nestjs/config';

//database
import {TypeOrmModule} from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import * as process from "process";
import entries from "./typeorm";


@Module({
  imports: [
    //env
    ConfigModule.forRoot({
      isGlobal: true,
    }),
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
    UsersModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
