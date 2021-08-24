import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  serializeUser(user: any, done: (err: Error, user: any) => void) {
    done(null, user);
  }

  async deserializeUser(user: any, done: (err: Error, user: any) => void) {
    const userDB = await this.userService.findUserByGoogleId(user.googleId);
    console.log('userDB', userDB);
    return userDB ? done(null, userDB) : done(null, null);
  }
}
