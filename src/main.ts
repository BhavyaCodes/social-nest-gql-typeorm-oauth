import { NestFactory } from '@nestjs/core';
import * as passport from 'passport';
import * as session from 'express-session';
import { AppModule } from './app.module';
import { getRepository } from 'typeorm';
import { AuthSession } from './auth/AuthSession.entity';
import { TypeormStore } from 'connect-typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [
        'http://localhost:3000',
        'http://localhost:5000',
        'https://studio.apollographql.com',
        'https://social-nest-gql-typeorm-oauth.vercel.app',
        'https://whispering-falls-42804.herokuapp.com',
      ],
      credentials: true,
    },
  });
  const sessionRepo = getRepository(AuthSession);
  console.log('NODE_ENV', process.env.NODE_ENV);
  app.use(
    session({
      cookie: {
        maxAge: 86400000,
        // sameSite: process.env.NODE_ENV === 'development' ? true : 'none',
        sameSite: 'lax',
        // httpOnly: true,
        // secure: process.env.NODE_ENV === 'development' ? false : true,

        // domain:
        //   process.env.NODE_ENV === 'development'
        //     ? 'localhost'
        //     : 'whispering-falls-42804.herokuapp.com',
      },
      secret: process.env.COOKIE_KEY || 'asdfgsdgighuidfghdiugdf',
      resave: false,
      saveUninitialized: false,
      store: new TypeormStore().connect(sessionRepo),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
