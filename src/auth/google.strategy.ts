import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    _accessToken: never,
    _refreshToken: never,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const { id, displayName, emails, photos } = profile;

    console.log(profile);

    const foundUser = await this.userService.findUserByGoogleId(id);

    if (foundUser) {
      return done(null, foundUser);
    }

    const createdUser = await this.userService.createUserWithGoogle({
      googleId: id,
      name: displayName,
      email: emails[0].value,
      imageUrl: photos[0].value,
    });

    if (createdUser) {
      return done(null, createdUser);
    }
    done(null, null);
  }
}
