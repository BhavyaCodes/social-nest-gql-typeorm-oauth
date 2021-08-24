import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { VerifyCallback } from 'passport-google-oauth20';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  serializeUser(user: any, done: VerifyCallback) {
    done(null, user);
  }

  async deserializeUser(user: any, done: VerifyCallback) {
    const userDB = await this.userService.findUserByGoogleId(user.googleId);
    return userDB ? done(null, userDB) : done(null, null);
  }
}
