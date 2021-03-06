import { ObjectType, Field, GraphQLISODateTime, ID } from '@nestjs/graphql';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'likes' })
@ObjectType()
@Unique('user_id_post_id', ['userId', 'postId'])
export class Like {
  @Field(() => ID, { nullable: false })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, name: 'user_id' })
  userId: string;

  @Field(() => User, { nullable: false })
  @ManyToOne(() => User, (user) => user.likes, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  // @CreateDateColumn({ nullable: false, name: 'created_at' })
  // @Field(() => GraphQLISODateTime, { nullable: false })
  // createdAt: Date;

  @CreateDateColumn({
    nullable: false,
    name: 'created_at',
    type: 'timestamptz',
  })
  @Field(() => GraphQLISODateTime, { nullable: false })
  createdAt: Date;

  @Column({ nullable: false, name: 'post_id' })
  postId: string;

  // @Field(() => Post, { nullable: false })
  @ManyToOne(() => Post, (post) => post.likes, {
    nullable: false,
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'post_id' })
  post: Post;
}
