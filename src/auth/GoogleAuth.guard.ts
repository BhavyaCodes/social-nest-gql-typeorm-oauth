import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  async canActivate(context: ExecutionContext) {
    const activate = (await super.canActivate(context)) as boolean;
    // console.log('activate', activate);
    const request = context.switchToHttp().getRequest();
    // console.log('request', request);
    await super.logIn(request);
    return activate;
  }
  // canActivate(context: ExecutionContext) {
  //   const request = context.switchToHttp().getRequest();
  //   super.logIn(request);
  //   return super.canActivate(context);
  // }
}
