import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtextractorService } from './jwtextractor.service';

@Global()
@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtextractorService],
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  exports: [AuthService, JwtextractorService],
})
export class AuthModule {}
