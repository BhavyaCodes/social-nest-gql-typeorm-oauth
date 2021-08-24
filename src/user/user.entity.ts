import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ name: 'google_id', unique: true, nullable: false })
  googleId: string;

  @Column({ nullable: false })
  @Field()
  name: string;

  @Column({ nullable: false })
  @Field()
  email: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  imageUrl: string;
}
