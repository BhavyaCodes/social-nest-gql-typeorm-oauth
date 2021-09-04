import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/post/entities/post.entity';
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

  async getPostsByUserId(userId: string): Promise<Post[]> {
    const posts = await this.postRepo.find({ userId });
    return posts;
  }
}
