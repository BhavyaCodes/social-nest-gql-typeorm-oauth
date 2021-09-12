import {
  Resolver,
  // Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  ID,
} from '@nestjs/graphql';
import { LikeService } from './like.service';
import { Like } from './entities/like.entity';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGuard } from 'src/auth/guards/GraphqlAuth.guard';
import { CurrentUserGraphQL } from 'src/auth/decorators/graphql-current-user.decorator';
import { User } from 'src/user/user.entity';
import { Post } from 'src/post/entities/post.entity';
import { PostService } from 'src/post/post.service';
// import { DeletedLike } from 'src/entities/DeletedLike.object';

@Resolver(() => Like)
export class LikeResolver {
  constructor(
    private readonly likeService: LikeService,
    private readonly postService: PostService,
  ) {}

  @UseGuards(GraphQLAuthGuard)
  @Mutation(() => Like)
  likePost(
    @Args('postId', { type: () => ID }) postId: string,
    @CurrentUserGraphQL() user: User,
  ) {
    return this.likeService.likePost(postId, user.id);
  }

  @UseGuards(GraphQLAuthGuard)
  @Mutation(() => Like)
  unLikePost(
    @Args('postId', { type: () => ID }) postId: string,
    @CurrentUserGraphQL() user: User,
  ) {
    return this.likeService.unLikePost(postId, user.id);
  }

  @ResolveField((_returns) => User)
  user(@Parent() like: Like): Promise<User> {
    return this.likeService.getUser(like.userId);
  }

  @ResolveField((_returns) => Post)
  post(@Parent() like: Like, @CurrentUserGraphQL() user: User): Promise<Post> {
    // return this.likeService.getPost(like.postId);
    return this.postService.findOneWithHasLiked(like.postId, user.id);
  }

  // @Query(() => [Like], { name: 'like' })
  // findAll() {
  //   return this.likeService.findAll();
  // }

  // @Query(() => Like, { name: 'like' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.likeService.findOne(id);
  // }

  // @Mutation(() => Like)
  // updateLike(@Args('updateLikeInput') updateLikeInput: UpdateLikeInput) {
  //   return this.likeService.update(updateLikeInput.id, updateLikeInput);
  // }

  // @Mutation(() => Like)
  // removeLike(@Args('id', { type: () => Int }) id: number) {
  //   return this.likeService.remove(id);
  // }
}
