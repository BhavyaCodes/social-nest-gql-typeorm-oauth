import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'comments' })
@ObjectType()
export class Comment {
  @Field(() => ID, { nullable: false })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String, { nullable: false })
  @Column({ type: 'varchar', length: 300, nullable: false })
  content: string;

  @Column({ nullable: false, name: 'user_id' })
  userId: string;

  @Field(() => User, { nullable: false })
  @ManyToOne(() => User, (user) => user.comments, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: false, name: 'post_id' })
  postId: string;

  @ManyToOne(() => Post, (post) => post.comments, {
    nullable: false,
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @CreateDateColumn({
    nullable: false,
    name: 'created_at',
    type: 'timestamptz',
  })
  @Field(() => GraphQLISODateTime, { nullable: false })
  createdAt: Date;
}
