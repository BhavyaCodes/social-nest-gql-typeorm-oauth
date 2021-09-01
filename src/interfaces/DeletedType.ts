import { Field, ID, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export abstract class DeletedType {
  @Field((_type) => ID)
  id: number;
}
