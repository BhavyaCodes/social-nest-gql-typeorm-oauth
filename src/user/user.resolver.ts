import { NotFoundException, UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { CurrentUserGraphQL } from 'src/auth/decorators/graphql-current-user.decorator';
import { GraphQLAuthGuard } from 'src/auth/guards/GraphqlAuth.guard';
import { Post } from 'src/post/entities/post.entity';
// import { GetUserProfileByIdInput } from './dto/get-user-profile-by-id.input';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { name: 'getUserProfile' })
  async getUserProfile(
    @Args('getUserProfileById')
    profileId: string,
  ): Promise<User> {
    const user = await this.userService.findUserByUserId(profileId);
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
  async posts(
    @Parent() user: User,
    @CurrentUserGraphQL() loggedInUser: User,
    @Args('timeStamp', { type: () => String, nullable: true })
    timeStamp: string,
  ): Promise<any> {
    if (loggedInUser) {
      const posts = await this.userService.getPostsByUserIdWithHasLiked(
        loggedInUser.id,
        timeStamp || '2030-09-10 16:42:02.212072',
        user.id,
      );
      return posts;
    }
    const posts = await this.userService.getPostsByUserId(
      timeStamp || '2030-09-10 16:42:02.212072',
      user.id,
    );
    return posts;
  }
}
