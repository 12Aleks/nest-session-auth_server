import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as process from "process";
import * as session from "express-session";
import * as passport from "passport"


const PORT = process.env.PORT || 5000

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    app.use(
        session({
            name: process.env.SESSION_NAME,
            secret: process.env.SESSION_KEY,
            cookie: {
                maxAge: 300 * 1000, //5 minutes
                httpOnly: true,
                sameSite: "lax", //protecting csrf
                // secure:__prod__  //cookie only works in https
                //  secure:__prod__
            },
            resave: false,
            saveUninitialized: false
        })
    );
    app.use(passport.initialize())
    app.use(passport.session())

    await app.listen(PORT, () => console.log(`Nest app worked on port - ${PORT}`));

}

bootstrap();
