import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as process from "process";
import * as session from "express-session";
import * as passport from "passport"
import * as cookieParser from 'cookie-parser';


const PORT = process.env.PORT || 5000

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.setGlobalPrefix('api');
    app.use(cookieParser());
    app.use(
        session({
            name: process.env.SESSION_NAME,
            secret: process.env.SESSION_KEY,
            cookie: {
                maxAge: 300 * 1000, //5 minutes (test time)
                httpOnly: true,
                sameSite: "lax",
            },
            resave: false,
            saveUninitialized: false
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
