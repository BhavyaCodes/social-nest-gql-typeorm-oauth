import {
  Resolver,
  // Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { LikeService } from './like.service';
import { Like } from './entities/like.entity';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGuard } from 'src/auth/guards/GraphqlAuth.guard';
import { CurrentUserGraphQL } from 'src/auth/decorators/graphql-current-user.decorator';
import { User } from 'src/user/user.entity';
// import { CreateLikeInput } from './dto/create-like.input';
// import { UpdateLikeInput } from './dto/update-like.input';

@Resolver(() => Like)
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}

  @UseGuards(GraphQLAuthGuard)
  @Mutation(() => Like)
  likePost(
    @Args('postId', { type: () => Int }) postId: number,
    @CurrentUserGraphQL() user: User,
  ) {
    return this.likeService.likePost(postId, user.id);
  }

  @ResolveField((_returns) => User)
  user(@Parent() like: Like): Promise<User> {
    return this.likeService.getUser(like.userId);
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
