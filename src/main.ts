import { NestFactory } from '@nestjs/core';
import * as passport from 'passport';
import * as session from 'express-session';
import { AppModule } from './app.module';
import { getRepository } from 'typeorm';
import { AuthSession } from './auth/AuthSession.entity';
import { TypeormStore } from 'connect-typeorm';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [
        'http://localhost:3000',
        'http://localhost:5000',
        'https://studio.apollographql.com',
        'https://whispering-falls-42804.herokuapp.com',
      ],
      credentials: true,
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const sessionRepo = getRepository(AuthSession);
  app.use(
    session({
      cookie: {
        maxAge: 86400000,
        sameSite: 'lax',
      },
      secret: process.env.COOKIE_KEY || 'asdfgsdgighuidfghdiugdf',
      resave: false,
      saveUninitialized: false,
      store: new TypeormStore().connect(sessionRepo),
    }),
  );
  app.setGlobalPrefix('api');
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
