import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/user/user.entity';

export const CurrentUser = createParamDecorator(
  (_data: never, context: ExecutionContext): User => {
    const user: User = context.switchToHttp().getRequest().user;
    return user;
  },
);
