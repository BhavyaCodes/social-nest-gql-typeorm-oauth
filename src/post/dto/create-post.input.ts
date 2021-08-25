import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field(() => String, {
    description: 'Text Content of the post',
    nullable: false,
  })
  content: string;
}
