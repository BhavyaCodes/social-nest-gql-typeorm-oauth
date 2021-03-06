import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/comment/entities/comment.entity';
import { Like } from 'src/like/entities/like.entity';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { Post } from './entities/post.entity';
import {
  PostWithLikesCount,
  PostWithLikesCountAndHasLiked,
} from './interfaces';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Like) private readonly likeRepo: Repository<Like>,
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
  ) {}
  create(createPostInput: CreatePostInput, user: User): Promise<Post> {
    const newPost = this.postRepo.create({ ...createPostInput, user });
    return this.postRepo.save(newPost);
  }

  findAllPosts(
    timeStamp: string,
    userId?: string | null,
  ): Promise<PostWithLikesCount[]> {
    if (userId) {
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
      WHERE (p.created_at < $1::TIMESTAMP AND p.user_id = $2 )
      ORDER BY p.created_at DESC
      LIMIT(5);
      `,
        [timeStamp, userId],
      );
    }
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
    WHERE (p.created_at < $1::TIMESTAMP )
    ORDER BY p.created_at DESC
    LIMIT(5);
    `,
      [timeStamp],
    );
  }

  findAllPostsWithHasLiked(
    currentUser: string,
    timeStamp: string,
    userId?: string | null,
  ): Promise<PostWithLikesCountAndHasLiked[]> {
    if (userId) {
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
        WHERE (p.created_at < $2::TIMESTAMP AND p.user_id = $3)
        ORDER BY p.created_at DESC
        LIMIT(5);
        `,
        [currentUser, timeStamp, userId],
      );
    }
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
      WHERE (p.created_at < $2::TIMESTAMP )
      ORDER BY p.created_at DESC
      LIMIT(5);
      `,
      [currentUser, timeStamp],
    );
  }

  async getUser(userId: string): Promise<User> {
    const user = await this.userRepo.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  findOne(id: string): Promise<Post> {
    return this.postRepo.findOneOrFail(id);
  }

  //TODO: this may be refactored later
  async findOneWithHasLiked(postId: string, userId: string): Promise<any> {
    const result = await this.postRepo.query(
      `
      SELECT p.id AS id,
        content,
        p.user_id AS "userId",
        p.created_at AS "createdAt",
        COALESCE(l.has_liked, false) AS "hasLiked"
      FROM posts AS p
        LEFT JOIN (
          SELECT true::boolean AS has_liked,
            post_id,
            user_id
          FROM likes
        ) AS l ON (
          l.post_id = p.id
          AND l.user_id = $1
        )
      WHERE p.id = $2
    `,
      [userId, postId],
    );
    return result[0];
  }

  getLikes(postId: string): Promise<Like[]> {
    return this.likeRepo.find({ postId });
  }

  getLikesCount(postId: string): Promise<number> {
    return this.likeRepo.count({ postId });
  }

  getCommentCount(postId: string): Promise<number> {
    return this.commentRepo.count({ postId });
  }

  async deletePost(postId: string, userId: string): Promise<Post> {
    const postToDelete = await this.postRepo.findOne({ id: postId, userId });
    if (!postToDelete) {
      throw new BadRequestException();
    }
    return this.postRepo.remove(postToDelete);
  }

  async hasLiked(postId: string, userId: string): Promise<boolean> {
    const hasLiked = await this.likeRepo.findOne({ postId, userId });
    return !!hasLiked;
  }

  // update(id: number, updatePostInput: UpdatePostInput) {
  //   return `This action updates a #${id} post`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} post`;
  // }
}
