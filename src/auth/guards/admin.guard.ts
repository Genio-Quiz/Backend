import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { JwtextractorService } from '../jwtextractor.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private jwtextractorService: JwtextractorService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = await this.jwtextractorService.extractToken(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET,
      });
      request['isAdmin'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    if (!request['isAdmin'].isAdmin) {
      throw new UnauthorizedException('Admin access required');
    }

    return true;
  }
}
