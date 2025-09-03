import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './signIn.dto';
import { AuthGuard } from './auth.guard';
import { CreateUserDTO } from 'src/user/dtos/create-user.dto';
import type { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() SignInDto: SignInDto, @Res() response: Response) {
    const token = await this.authService.signIn(SignInDto);
    response.cookie('token', token.token);

    response.send(token);
  }

  @Post('signUp')
  signUp(@Body() createUserDto: CreateUserDTO) {
    return this.authService.signUp(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('protected')
  getProtected(@Req() req: Request) {
    if (!req.cookies || Object.keys(req.cookies).length === 0) {
      return { error: 'sem cookie, q fome' };
    }
    return req.cookies;
  }
}
