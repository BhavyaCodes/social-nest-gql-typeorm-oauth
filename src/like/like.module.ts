import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeResolver } from './like.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { User } from 'src/user/user.entity';
import { Post } from 'src/post/entities/post.entity';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [TypeOrmModule.forFeature([Like, User, Post]), PostModule],
  providers: [LikeResolver, LikeService],
})
export class LikeModule {}
