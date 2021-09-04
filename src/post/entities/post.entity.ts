import {
  ObjectType,
  Field,
  Int,
  GraphQLISODateTime,
  ID,
} from '@nestjs/graphql';
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
  @Field(() => ID, { description: 'Id of the post', nullable: false })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String, { nullable: false })
  @Column()
  content: string;

  @Column({ nullable: false, name: 'user_id' })
  userId: string;

  @Field(() => User, { nullable: false })
  @ManyToOne(() => User, (user) => user.posts, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ nullable: false })
  @Field(() => GraphQLISODateTime, { nullable: false })
  createdDate: Date;

  @OneToMany(() => Like, (like) => like.post)
  @Field(() => [Like])
  likes: Like[];

  @Field(() => Int, { nullable: false, description: 'Likes count' })
  likeCount: number;
}
