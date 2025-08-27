import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateAlternativaDto {
  @IsString()
  @MaxLength(255)
  texto: string;

  @IsBoolean()
  @IsOptional()
  estaCorreta: boolean;

  @IsNumber()
  questaoId: number;
}
