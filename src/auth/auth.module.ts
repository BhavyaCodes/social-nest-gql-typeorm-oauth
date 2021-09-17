import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google.strategy';
import { SessionSerializer } from './Serializer';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, SessionSerializer],
})
export class AuthModule {}
