import { Field, InputType, Int } from '@nestjs/graphql';
// import { IsNumber } from 'class-validator';

@InputType()
export class GetUserProfileByIdInput {
  @Field(() => Int, { nullable: false })
  // @IsNumber()
  userId: number;
}
