import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeletedItem {
  @Field((_type) => ID)
  id: string;
}
