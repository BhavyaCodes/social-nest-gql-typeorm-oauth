import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Like } from 'src/like/entities/like.entity';
import { Post } from 'src/post/entities/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID, { nullable: false })
  id: string;

  @Column({ name: 'google_id', unique: true, nullable: false })
  googleId: string;

  @Column({ nullable: false })
  @Field()
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: true, name: 'image_url' })
  @Field({ nullable: true })
  imageUrl: string;

  @OneToMany(() => Post, (post) => post.user)
  @Field((_type) => [Post], { nullable: true })
  posts?: Post[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @CreateDateColumn({ nullable: false, name: 'created_at' })
  createdAt: Date;
}
