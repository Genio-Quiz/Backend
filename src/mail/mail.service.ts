import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendMailDto } from './mail.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserConfirmation(dto: SendMailDto) {
    await this.mailerService.sendMail({
      to: dto.userEmail,
      subject: 'Confirme o seu email no Sabichão!!!',
      template: './templates/confirmacao.hbs',
      context: {
        name: dto.userName,
        confirmationUrl: `http://localhost:3000s/auth/confirm:token=${dto.token}`,
      },
    });
  }

  async sendUserRecuperation(dto: SendMailDto) {
    await this.mailerService.sendMail({
      to: dto.userEmail,
      subject: 'Recupere a sua senha no Sabichão!!!',
      template: './templates/recuperacao.hbs',
      context: {
        name: dto.userName,
        link: `http://localhost:3000/users/recovery?token=${dto.token}`,
      },
    });
  }
}
