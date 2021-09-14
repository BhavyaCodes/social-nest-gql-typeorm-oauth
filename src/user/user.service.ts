import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/post/entities/post.entity';
import {
  PostWithLikesCount,
  PostWithLikesCountAndHasLiked,
} from 'src/post/interfaces';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
  ) {}

  findUserByGoogleId(googleId: string): Promise<User | undefined> {
    return this.userRepo.findOne({ googleId });
  }

  createUserWithGoogle(options: {
    googleId: string;
    email: string;
    name: string;
    imageUrl?: string;
  }): Promise<User> {
    const createdUser = this.userRepo.create(options);
    return this.userRepo.save(createdUser);
  }

  async findUserByUserId(userId: string): Promise<User | undefined> {
    return this.userRepo.findOne({ id: userId });
  }

  getPostsByUserId(
    timeStamp: string,
    userId: string,
  ): Promise<PostWithLikesCount[]> {
    return this.postRepo.query(
      `
    SELECT 
      p.id,
      p.content,
      p.user_id AS "userId", 
      p.created_at AS "createdAt",
      COALESCE(l.likes_count::INTEGER, 0::INTEGER) AS "likesCount" 
    FROM posts AS p
      LEFT JOIN (
        SELECT post_id,
          COUNT(*) AS likes_count
        FROM likes
        GROUP BY post_id 
    ) AS l ON p.id = l.post_id
    WHERE (p.created_at < $1::TIMESTAMP AND p.user_id = $2)
    ORDER BY p.created_at DESC
    LIMIT(2);
    `,
      [timeStamp, userId],
    );
  }

  getPostsByUserIdWithHasLiked(
    currentUserId: string,
    timeStamp: string,
    userId: string,
  ): Promise<PostWithLikesCountAndHasLiked[]> {
    return this.postRepo.query(
      `
    SELECT 
      p.id,
      p.content,
      p.user_id AS "userId",
      p.created_at AS "createdAt",
      COALESCE(l.likes_count::INTEGER, 0::INTEGER) AS "likesCount",
      COALESCE(l2.has_liked::BOOLEAN, false::BOOLEAN) AS "hasLiked"
    FROM posts AS p
      LEFT JOIN (
        SELECT post_id,
          COUNT(*) as likes_count
        FROM likes
        GROUP BY post_id
      ) AS l ON p.id = l.post_id
      LEFT JOIN (
        SELECT likes.post_id,
          true AS has_liked
        FROM likes
        WHERE user_id = $1
      ) AS l2 ON p.id = l2.post_id
      WHERE (p.created_at < $2::TIMESTAMP fAND p.user_id = $3 )
      ORDER BY p.created_at DESC
      LIMIT(2);
      `,
      [currentUserId, timeStamp, userId],
    );
  }
}
