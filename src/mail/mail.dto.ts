import { IsEmail, IsString } from "class-validator";

export class SendMailDto {
    @IsEmail()
    userEmail: string;

    @IsString()
    userName: string;

    @IsString()
    token: string;
}