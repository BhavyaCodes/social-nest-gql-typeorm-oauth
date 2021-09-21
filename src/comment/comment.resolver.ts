import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { GraphQLAuthGuard } from 'src/auth/guards/GraphqlAuth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUserGraphQL } from 'src/auth/decorators/graphql-current-user.decorator';
import { User } from 'src/user/user.entity';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(GraphQLAuthGuard)
  @Mutation(() => Comment)
  createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
    @CurrentUserGraphQL() user: User,
  ) {
    return this.commentService.create(createCommentInput, user);
  }

  @Query(() => [Comment], { name: 'findCommentsByPost' })
  findCommentsByPost(
    @Args('postId', { type: () => ID, nullable: false }) postId: string,
  ) {
    return this.commentService.findCommentsByPost(postId);
  }

  @Query(() => Comment, { name: 'comment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.commentService.findOne(id);
  }

  @Mutation(() => Comment)
  updateComment(
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
  ) {
    return this.commentService.update(
      updateCommentInput.id,
      updateCommentInput,
    );
  }

  @UseGuards(GraphQLAuthGuard)
  @Mutation(() => Comment)
  removeComment(
    @Args('id', { type: () => ID, nullable: false }) commentId: string,
    @CurrentUserGraphQL() user: User,
  ) {
    return this.commentService.remove(commentId, user);
  }
}
