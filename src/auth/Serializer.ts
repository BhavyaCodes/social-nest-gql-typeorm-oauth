import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  // constructor(private ) {
  //   super();
  // }

  serializeUser(user: any, done: (err: Error, user: any) => void) {
    done(null, user);
  }

  deserializeUser(user: any, done: (err: Error, user: any) => void) {
    done(null, user ? { email: user.email } : null);
  }
}
