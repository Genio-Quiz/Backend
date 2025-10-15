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
import { MailService } from 'src/mail/mail.service';
import { SignInDto } from './signIn.dto';
import { SendMailDto } from 'src/mail/mail.dto';
import { ResetPasswordDto } from './reset-password.dto';
import { AuthGuard } from './guards/auth.guard';
import { RecoveryDto } from 'src/mail/recovery.dto';
import { CreateUserDTO } from 'src/user/dtos/create-user.dto';
import type { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private mailService: MailService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() SignInDto: SignInDto, @Res() response: Response) {
    const token = await this.authService.signIn(SignInDto);
    response.cookie('token', token.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'production',
      sameSite: 'strict',
    });

    response.send(token);
  }

  @Post('signUp')
  signUp(@Body() createUserDto: CreateUserDTO) {
    return this.authService.signUp(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logOut(@Res() response: Response) {
    response.clearCookie('token').end();
  }

  @UseGuards(AuthGuard)
  @Get('protected')
  getProtected(@Req() req: Request) {
    if (!req.cookies || Object.keys(req.cookies).length === 0) {
      return { error: 'sem cookie, q fome' };
    }
    return req.cookies;
  }

  @Post('recovery')
  async recovery(@Body() recoveryDto: RecoveryDto) {
    const { userEmail } = recoveryDto;
    const user = await this.authService.findByEmail(userEmail);

    if (!user) {
      return {
        message: 'Caso o e-mail esteja cadastrado, você receberá instruções.',
      };
    }

    const recoveryToken = this.authService.generateRecoveryToken(user.id);

    const sendMailDto: SendMailDto = {
      ...user,
      token: recoveryToken,
    };

    await this.mailService.sendUserRecuperation(sendMailDto);
    return {
      message:
        'Caso esse email esteja cadastrado, você receberá um email de recuperação',
    };
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(
      resetPasswordDto.password,
      resetPasswordDto.token,
    );
  }
}
