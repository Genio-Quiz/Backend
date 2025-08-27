import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './signIn.dto';
import { CreateUserDTO } from 'src/user/user.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() SignInDto: SignInDto) {
    return this.authService.signIn(SignInDto);
  }
  @Post('signUp')
  signUp(@Body() createUserDto: CreateUserDTO) {
    return this.authService.signUp(createUserDto);
  }
  @UseGuards(AuthGuard)
  @Get('protected')
  getProtected(@Request() req) {
    return 'Hello from protection';
  }
}
