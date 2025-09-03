import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsBoolean()
  isAdmin: boolean;

  @IsNumber()
  score = 0;
}
