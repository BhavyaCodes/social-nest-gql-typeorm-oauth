import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // callbackURL: 'http://localhost:5000/auth/google/callback',
      callbackURL: `${
        configService.get('NODE_ENV') === 'production'
          ? 'https://whispering-falls-42804.herokuapp.com'
          : 'http://localhost:5000'
      }/auth/google/callback`,

      scope: ['email', 'profile'],
      // proxy: true,
    });
  }

  async validate(
    _accessToken: never,
    _refreshToken: never,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const { id, displayName } = profile;

    const foundUser = await this.userService.findUserByGoogleId(id);
    console.log(foundUser);

    if (foundUser) {
      return done(null, foundUser);
    }

    const createdUser = await this.userService.createUserWithGoogle({
      googleId: id,
      name: displayName,
      email: profile._json.email,
      imageUrl: profile._json.picture,
    });

    if (createdUser) {
      return done(null, createdUser);
    }
    done(null, undefined);
  }
}
