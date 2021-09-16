import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { User } from 'src/user/user.entity';
import { AuthenticationGuard } from './guards/Auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { GoogleAuthGuard } from './guards/GoogleAuth.guard';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(private readonly configService: ConfigService) {}
  /**
   * GET /auth/google
   * This is the route the user will visit to authenticate
   */
  @Get('/google')
  @UseGuards(GoogleAuthGuard)
  login() {
    return {};
  }

  /**
   * GET /auth/google/callback
   * This is the redirect URL the OAuth2 Provider will call.
   */
  @Get('/google/callback')
  @UseGuards(GoogleAuthGuard)
  callback(@Req() req: Request, @Res() res: Response) {
    // res.redirect('/auth/whoami');
    // console.log(req.cookies);
    // console.log(req.headers);

    console.log(this.configService.get('CLIENT_URL'));
    res.redirect(200, this.configService.get('CLIENT_URL') as string);
  }

  /**
   * returns current logged in user info
   * @param req
   * @returns
   */
  @Get('whoami')
  @UseGuards(AuthenticationGuard)
  whoami(
    // @Req() req: Request,
    @CurrentUser() user: User,
  ) {
    // if (!req.user) {
    //   throw new UnauthorizedException();
    // }
    // return req.user;
    return user;
  }

  // @UseGuards(AuthenticationGuard)
  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.logOut();
    res.redirect(this.configService.get('CLIENT_URL') as string);
  }
}
