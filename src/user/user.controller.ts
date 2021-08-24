import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // @Get('/test')
  // async test() {
  //   const user = await this.userService.findUserByGoogleId('sgdfg');
  //   console.log(user);
  //   return user;
  // }
}
