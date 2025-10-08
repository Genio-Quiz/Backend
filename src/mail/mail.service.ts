import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendMailDto } from './mail.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserConfirmation(dto: SendMailDto) {
    await this.mailerService.sendMail({
      to: dto.email,
      subject: 'Confirme o seu email no Sabichão!!!',
      template: 'confirmacao',
      context: {
        name: dto.username,
        confirmationUrl: `http://localhost:3000/auth/confirm:token=${dto.token}`,
      },
    });
  }

  async sendUserRecuperation(dto: SendMailDto) {
    await this.mailerService.sendMail({
      to: dto.email,
      subject: 'Recupere a sua senha no Sabichão!!!',
      template: 'recuperacao',
      context: {
        name: dto.username,
        link: `http://localhost:3000/users/recovery?token=${dto.token}`,
      },
    });
  }
}
