import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
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
  callback(@Req() req: Request) {
    console.log('callback');
    // console.log(req.user);
    // res.redirect('http://localhost:3000/dashboard');
    // return JSON.stringify(req.user);
    return 'ok';
  }

  /**
   * GET /auth/status
   * Retrieve the auth status
   */
  @Get('status')
  // @UseGuards(GoogleAuthGuard)
  status(@Req() req: Request) {
    return { user: req.user || null };
  }

  @Get('logout')
  logout(@Req() req: Request) {
    req.logOut();
  }
}
