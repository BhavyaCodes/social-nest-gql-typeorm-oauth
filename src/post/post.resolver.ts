import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Int,
} from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
// import { UpdatePostInput } from './dto/update-post.input';
import { GraphQLAuthGuard } from 'src/auth/guards/GraphqlAuth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUserGraphQL } from 'src/auth/decorators/graphql-current-user.decorator';
import { User } from 'src/user/user.entity';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  @UseGuards(GraphQLAuthGuard)
  createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @CurrentUserGraphQL() user: User,
  ) {
    return this.postService.create(createPostInput, user);
  }

  @Query(() => [Post], { name: 'allPosts' })
  findAll() {
    return this.postService.findAllPosts();
  }

  @ResolveField((_returns) => User)
  user(@Parent() post: Post): Promise<User> {
    return this.postService.getUser(post.userId);
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.postService.findOne(id);
  }

  // @Mutation(() => Post)
  // updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
  //   return this.postService.update(updatePostInput.id, updatePostInput);
  // }

  // @Mutation(() => Post)
  // removePost(@Args('id', { type: () => Int }) id: number) {
  //   return this.postService.remove(id);
  // }
}
