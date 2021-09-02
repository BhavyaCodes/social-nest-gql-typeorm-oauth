import { Field, ID, InputType } from '@nestjs/graphql';
// import { IsNumber } from 'class-validator';

@InputType()
export class GetUserProfileByIdInput {
  @Field(() => ID, { nullable: false })
  userId: string;
}
