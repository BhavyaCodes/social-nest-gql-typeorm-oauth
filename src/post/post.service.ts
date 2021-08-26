import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'src/like/entities/like.entity';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
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
    return this.postRepo.find({});
  }

  async getUser(userId: number): Promise<User> {
    const user = await this.userRepo.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  findOne(id: number): Promise<Post> {
    return this.postRepo.findOneOrFail(id);
  }

  getLikes(postId: number): Promise<Like[]> {
    return this.likeRepo.find({ postId });
  }

  // update(id: number, updatePostInput: UpdatePostInput) {
  //   return `This action updates a #${id} post`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} post`;
  // }
}
