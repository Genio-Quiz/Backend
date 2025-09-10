import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserConfirmation(
    userEmail: string,
    userName: string,
    token: string,
  ) {
    await this.mailerService.sendMail({
      to: userEmail,
      subject: 'Confirme o seu email no Sabichão!!!',
      template: './templates/confirmacao.hbs',
      context: {
        name: userName,
        confirmationUrl: `http://localhost:3000/auth/confirm:token=${token}`,
      },
    });
  }

  async sendUserRecuperation(
    userEmail: string,
    userName: string,
    token: string,
  ) {
    await this.mailerService.sendMail({
      to: userEmail,
      subject: 'Recupere a sua senha no Sabichão!!!',
      template: './templates/recuperacao.hbs',
      context: {
        name: userName,
        link: `http://localhost:3000/users/recovery?token=${token}`,
      },
    });
  }
}
