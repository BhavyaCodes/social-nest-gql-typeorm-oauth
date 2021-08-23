import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';

export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // private configService: ConfigService
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  validate(
    _accessToken: never,
    _refreshToken: never,
    profile: Profile,
    done: VerifyCallback,
  ): Profile | void {
    const { id, displayName, emails, photos } = profile;

    // const tempUser = { ...profile };
    // console.log(profile);
    // console.log('validate');
    console.log(profile);

    done(null, JSON.parse(JSON.stringify({ id, displayName, emails, photos })));
  }
}
