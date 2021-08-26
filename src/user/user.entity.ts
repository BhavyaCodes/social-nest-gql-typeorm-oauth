import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/post/entities/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { nullable: false })
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

  @OneToMany(() => Post, (post) => post.user)
  @Field((_type) => [Post], { nullable: true })
  posts?: Post[];

  @CreateDateColumn({ nullable: false })
  createdDate: Date;
}
