import {
  Controller,
  Get,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthenticationGuard } from './Auth.guard';
import { GoogleAuthGuard } from './GoogleAuth.guard';

@Controller('auth')
export class AuthController {
  /**
   * GET /auth/google
   * This is the route the user will visit to authenticate
   */
  @Get('/google')
  @UseGuards(GoogleAuthGuard)
  login() {
    console.log('/login');
    return {};
  }

  /**
   * GET /auth/google/callback
   * This is the redirect URL the OAuth2 Provider will call.
   */
  @Get('/google/callback')
  @UseGuards(GoogleAuthGuard)
  callback(@Req() req: Request, @Res() res: Response) {
    console.log('callback');
    // console.log(req.user);
    // res.redirect('http://localhost:3000/dashboard');
    // return JSON.stringify(req.user);
    res.redirect('/auth/whoami');
  }

  /**
   * returns current logged in user info
   * @param req
   * @returns
   */
  @Get('whoami')
  @UseGuards(AuthenticationGuard)
  whoami(@Req() req: Request) {
    // console.log('whoami');
    // if (!req.user) {
    //   throw new UnauthorizedException();
    // }
    return req.user;
  }

  @Get('logout')
  logout(@Req() req: Request) {
    req.logOut();
  }
}
