import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  findUserByGoogleId(googleId: string): Promise<User | undefined> {
    return this.userRepo.findOne({ googleId });
  }

  createUserWithGoogle(options: {
    googleId: string;
    email: string;
    name: string;
    imageUrl?: string;
  }): Promise<User> {
    const createdUser = this.userRepo.create(options);
    return this.userRepo.save(createdUser);
  }

  async findUserByUserId(userId: number): Promise<User | undefined> {
    return this.userRepo.findOne({ id: userId });
  }
}
