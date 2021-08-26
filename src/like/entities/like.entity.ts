import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Like {
  @Field(() => Int, { nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, name: 'user_id' })
  userId: number;

  @Field(() => User, { nullable: false })
  @ManyToOne(() => User, (user) => user.likes, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ nullable: false })
  @Field(() => GraphQLISODateTime, { nullable: false })
  createdDate: Date;
}
