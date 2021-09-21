import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field(() => String, {
    description: 'Text Content of the post',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  content: string;
}
