import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';
import { Like } from 'src/like/entities/like.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Post {
  @Field(() => Int, { description: 'Id of the post', nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { nullable: false })
  @Column()
  content: string;

  @Column({ nullable: false, name: 'user_id' })
  userId: number;

  @Field(() => User, { nullable: false })
  @ManyToOne(() => User, (user) => user.posts, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ nullable: false })
  @Field(() => GraphQLISODateTime, { nullable: false })
  createdDate: Date;

  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];
}
