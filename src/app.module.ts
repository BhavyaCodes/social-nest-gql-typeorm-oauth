import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { PostModule } from './post/post.module';
import { LikeModule } from './like/like.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client', 'out'),
      exclude: ['/api*'],
      serveStaticOptions: {
        // index: true,
        extensions: ['html'],
      },
    }),
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ envFilePath: '.env.development', isGlobal: true }),
    PassportModule.register({ session: true }),
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      debug: false,
      playground: true,
      introspection: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      useGlobalPrefix: true,
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
    }),
    PostModule,
    LikeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
