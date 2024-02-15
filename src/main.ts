import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as process from "process";
import * as session from "express-session";
import * as passport from "passport"
import * as cookieParser from 'cookie-parser';
import {SessionEntity} from "./typeorm";
import {TypeormStore} from "connect-typeorm";
import { DataSource } from 'typeorm';

const fs = require("fs");


const PORT = process.env.PORT || 3000

const httpsOptions = {
    key: fs.readFileSync("./src/cert/localhost-key.pem"),
    cert: fs.readFileSync("./src/cert/localhost.pem")
};

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true, httpsOptions });
    const sessionRepository =  app.get(DataSource).getRepository(SessionEntity);


    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Content-Type, Authorization',
        );
        next();
    });

    app.enableCors(
        {
            origin: 'https://localhost:5000',
            credentials: true
        }
    );


    app.setGlobalPrefix('api');
    app.use(cookieParser());// To parse the incoming cookies
    app.use(
        session({
            name: process.env.SESSION_NAME ,
            secret: process.env.SESSION_KEY,
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 6*60*60*1000,
                httpOnly: true,
                // sameSite:'none',
                // secure:false,
            },
            store: new TypeormStore().connect(sessionRepository),
        })
    );



    app.use(passport.initialize())
    app.use(passport.session())

    //update cookies maxAge with new queries (this is app.use and UpdateMaxAgeMiddleware)
    app.use(function (req, res, next) {
        req.session.nowInMinutes = Math.floor(Date.now() / 60e3);
        next();
    })

    await app.listen(PORT, () => console.log(`Nest app worked on port - ${PORT}`));

}

bootstrap();
