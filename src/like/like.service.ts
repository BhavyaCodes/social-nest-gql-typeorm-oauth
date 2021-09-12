import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';
// import { CreateLikeInput } from './dto/create-like.input';
// import { UpdateLikeInput } from './dto/update-like.input';

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
    // const alreadyLiked = this.likeRepo.update({ userId });
    // return alreadyLiked;
    // return 'This action adds a new like';
    const alreadyExists = await this.likeRepo.findOne({ userId, postId });
    if (alreadyExists) {
      throw new ConflictException('Post Already Liked');
    }
    const createdLike = this.likeRepo.create({ userId, postId });
    return this.likeRepo.save(createdLike);
  }

  getUser(userId: string): Promise<User> {
    return this.userRepo.findOneOrFail(userId);
  }

  // getPost(postId: string): Promise<Post> {
  //   return this.postRepo.findOneOrFail(postId);
  // }
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
