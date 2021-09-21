import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @Field(() => ID, { description: 'id of post' })
  @IsUUID()
  postId: string;

  @Field(() => String, { description: 'Content of comment' })
  @IsNotEmpty()
  @IsString()
  content: string;
}
