import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Like } from 'src/like/entities/like.entity';
import { Post } from 'src/post/entities/post.entity';
import { Comment } from 'src/comment/entities/comment.entity';

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

  @Column({
    name: 'google_id',
    unique: true,
    nullable: false,
    type: 'varchar',
    length: 100,
  })
  googleId: string;

  @Column({ nullable: false, type: 'varchar', length: 100 })
  @Field()
  name: string;

  @Column({ nullable: false, type: 'varchar', length: 100 })
  email: string;

  @Column({ nullable: true, name: 'image_url', type: 'varchar', length: 150 })
  @Field({ nullable: true })
  imageUrl: string;

  @OneToMany(() => Post, (post) => post.user)
  @Field((_type) => [Post], { nullable: true })
  posts?: Post[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments?: Comment[];

  @CreateDateColumn({
    nullable: false,
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt: Date;

  // @CreateDateColumn({ nullable: false, name: 'created_at' })
  // createdAt: Date;
}
