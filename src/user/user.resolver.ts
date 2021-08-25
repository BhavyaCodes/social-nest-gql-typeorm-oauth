import { NotFoundException, UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { CurrentUserGraphQL } from 'src/auth/decorators/graphql-current-user.decorator';
import { GraphQLAuthGuard } from 'src/auth/guards/GraphqlAuth.guard';
import { Post } from 'src/post/entities/post.entity';
import { PostService } from 'src/post/post.service';
import { GetUserProfileByIdInput } from './dto/get-user-profile-by-id.input';
import { User } from './user.entity';
import { UserService } from './user.service';

// @Resolver(() => User)
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { name: 'user' })
  async getUserProfile(
    @Args('getUserProfileById')
    getUserProfileByIdInput: GetUserProfileByIdInput,
  ): Promise<User> {
    const user = await this.userService.findUserByUserId(
      getUserProfileByIdInput.userId,
    );
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Query(() => User)
  @UseGuards(GraphQLAuthGuard)
  async getCurrentLoggedInUser(@CurrentUserGraphQL() user: User) {
    return user;
  }

  @ResolveField((_returns) => [Post])
  posts(@Parent() user: User): Promise<Post[]> {
    return this.userService.getPostsByUserId(user.id);
  }
}
