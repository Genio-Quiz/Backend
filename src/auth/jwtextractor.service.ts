import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class JwtextractorService {
  async extractToken(request: Request): Promise<string> {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    if (type === 'Bearer' && token) {
      return token;
    }
    if (request.cookies?.token) {
      return request.cookies.token;
    }
    throw new Error('Token not found');
  }
}
