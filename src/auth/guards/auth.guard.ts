import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtextractorService } from '../jwtextractor.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private jwtextractorService: JwtextractorService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = await this.jwtextractorService.extractToken(request);

      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET,
      });
      request['user'] = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException(
        'Invalid or missing token',
        error.message,
      );
    }
  }
}
