import { NotFoundException } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { GetUserProfileByIdInput } from './dto/get-user-profile-by-id.input';
import { User } from './user.entity';
import { UserService } from './user.service';

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
}
