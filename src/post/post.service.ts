import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'src/like/entities/like.entity';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
// import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Like) private readonly likeRepo: Repository<Like>,
  ) {}
  create(createPostInput: CreatePostInput, user: User): Promise<Post> {
    const newPost = this.postRepo.create({ ...createPostInput, user });
    return this.postRepo.save(newPost);
  }

  findAllPosts(): Promise<Post[]> {
    // return this.postRepo.find({});

    return this.postRepo.query(`
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
    ) AS l ON p.id = l.post_id;`);
    // console.log(
    //   this.postRepo
    //     .createQueryBuilder('p')
    //     .select([
    //       'p.id',
    //       'p.content',
    //       'p.user_id',
    //       'p.created_at',
    //       'COALESCE(l.likes_count, 0) as likes_count',
    //     ])
    //     .leftJoinAndSelect(
    //       (qb) =>
    //         qb
    //           .select(['l.post_id', 'COUNT(*) as likes_count'])
    //           .from(Like, 'l')
    //           .groupBy('l.post_id'),
    //       'l',
    //       'p.id = l.post_id',
    //     )
    //     .getQuery(),
    // );

    // return this.postRepo
    //   .createQueryBuilder('p')
    //   .select([
    //     'p.id',
    //     'p.content',
    //     'p.user_id',
    //     'p.created_at',
    //     'COALESCE(l.likes_count, 0) as likes_count',
    //   ])
    //   .leftJoinAndSelect(
    //     (qb) =>
    //       qb
    //         .select(['l.post_id', 'COUNT(*) as likes_count'])
    //         .from(Like, 'l')
    //         .groupBy('l.post_id'),
    //     'l',
    //     'p.id = l.post_id',
    //   )
    //   .getMany();
  }

  findAllPostsWithHasLiked(_userId: string) {
    // return (
    //   this.postRepo
    //     .createQueryBuilder('posts')
    //     .leftJoinAndSelect('post', 'likes')
    //     // .where('likes.user_id = :userId', { userId })
    //     // .orWhere('likes.id IS NULL')
    //     .printSql()
    //     .getMany()
    // );
    return this.postRepo.find({});
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

  getLikes(postId: string): Promise<Like[]> {
    return this.likeRepo.find({ postId });
  }

  getLikesCount(postId: string): Promise<number> {
    return this.likeRepo.count({ postId });
  }

  async deletePost(postId: string, userId: string): Promise<Post> {
    const postToDelete = await this.postRepo.findOne({ id: postId, userId });
    if (!postToDelete) {
      throw new BadRequestException();
    }
    return this.postRepo.remove(postToDelete);
  }

  // update(id: number, updatePostInput: UpdatePostInput) {
  //   return `This action updates a #${id} post`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} post`;
  // }
}
