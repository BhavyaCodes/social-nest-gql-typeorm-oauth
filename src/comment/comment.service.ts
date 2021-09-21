import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/comment/entities/comment.entity';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
  ) {}
  create({ content, postId }: CreateCommentInput, user: User) {
    const newComment = this.commentRepo.create({
      user,
      content,
      postId,
    });

    return this.commentRepo.save(newComment);
  }

  async findCommentsByPost(postId: string) {
    const comments = await this.commentRepo.find({
      relations: ['user'],
      where: { postId },
    });
    return comments;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentInput: UpdateCommentInput) {
    return `This action updates a #${id} comment`;
  }

  async remove(commentId: string, user: User) {
    const commentDoc = await this.commentRepo.findOne({
      user,
      id: commentId,
    });

    if (!commentDoc) {
      throw new NotFoundException('comment not found');
    }

    const removedComment = await this.commentRepo.remove(commentDoc);
    return { ...removedComment, id: commentId, user };
  }
}
