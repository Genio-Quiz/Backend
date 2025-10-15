import { IsEmail, IsString } from 'class-validator';

export class SendMailDto {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  token: string;
}
