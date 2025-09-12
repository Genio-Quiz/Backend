import { IsNumber, IsString } from 'class-validator';

export class CreateDisciplinaDto {
  @IsString()
  nome: string;

  @IsString()
  desc: string;

  @IsNumber()
  cursoId: number;
}
