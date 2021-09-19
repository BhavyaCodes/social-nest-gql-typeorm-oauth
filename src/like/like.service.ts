import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepo: Repository<Like>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
  ) {}
  async likePost(postId: string, userId: string): Promise<Like> {
    const alreadyExists = await this.likeRepo.findOne({ userId, postId });
    if (alreadyExists) {
      throw new ConflictException('Post Already Liked');
    }
    const createdLike = this.likeRepo.create({ userId, postId });
    return this.likeRepo.save(createdLike);
  }

  async unLikePost(postId: string, userId: string): Promise<any> {
    const likeDoc = await this.likeRepo.findOne({ userId, postId });
    if (!likeDoc) {
      throw new BadRequestException('Post not liked');
    }
    const removedLikeDoc = await this.likeRepo.remove(likeDoc);
    return { ...removedLikeDoc, id: postId };
  }

  getUser(userId: string): Promise<User> {
    return this.userRepo.findOneOrFail(userId);
  }

  async getUsersWhoLikedPost(postId: string): Promise<User[]> {
    const docs = await this.likeRepo.find({
      where: { postId },
      relations: ['user'],
    });

    if (docs.length === 0) {
      throw new NotFoundException('Post not found');
    }

    const users = docs.map((like) => like.user);
    return users;
  }

  // findAll() {
  //   return `This action returns all like`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} like`;
  // }

  // update(id: number, updateLikeInput: UpdateLikeInput) {
  //   return `This action updates a #${id} like`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} like`;
  // }
}
