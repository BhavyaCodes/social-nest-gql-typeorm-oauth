import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  ID,
} from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
// import { UpdatePostInput } from './dto/update-post.input';
import { GraphQLAuthGuard } from 'src/auth/guards/GraphqlAuth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUserGraphQL } from 'src/auth/decorators/graphql-current-user.decorator';
import { User } from 'src/user/user.entity';
import { Like } from 'src/like/entities/like.entity';
import { DeletedItem } from 'src/entities/DeletedItem.entity';

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

  @Query(() => [Post], {
    name: 'allPostsWithLikeCount',
    description: 'gets all posts with a likesCount field with int value',
  })
  async findAll(@CurrentUserGraphQL() user: User) {
    console.log(user);
    if (user) {
      const posts = await this.postService.findAllPosts();
      return posts;
    }
    const posts = await this.postService.findAllPosts();
    return posts;
  }

  // @Query(() => [Post], { name: 'allPostsWithLikes' })
  // async findAllWithHasLiked() {
  //   const result = await this.postService.findAllPostsWithHasLiked(
  //     '8f8f448b-d47c-4055-9080-f1a186174e26',
  //   );
  //   return result;
  // }

  @ResolveField((_returns) => User)
  user(@Parent() post: Post): Promise<User> {
    return this.postService.getUser(post.userId);
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => ID, nullable: false }) id: string) {
    return this.postService.findOne(id);
  }

  @ResolveField((_returns) => [Like])
  likes(@Parent() post: Post): Promise<Like[]> {
    return this.postService.getLikes(post.id);
  }

  @ResolveField((_returns) => [Like])
  likeCount(@Parent() post: Post): Promise<number> {
    return this.postService.getLikesCount(post.id);
  }

  @UseGuards(GraphQLAuthGuard)
  @Mutation((_returns) => DeletedItem)
  async deletePost(
    @Args('id', { type: () => ID, nullable: false }) id: string,
    @CurrentUserGraphQL() user: User,
  ): Promise<DeletedItem> {
    await this.postService.deletePost(id, user.id);
    return { id };
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
