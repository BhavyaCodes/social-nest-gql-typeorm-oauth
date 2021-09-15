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
      ],
      credentials: true,
    },
  });
  const sessionRepo = getRepository(AuthSession);
  app.use(
    session({
      cookie: { maxAge: 86400000 },
      secret: 'asdfgsdgighuidfghdiugdf',
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
