import { IsNumber, IsString } from 'class-validator';

export class CreateDisciplinaDto {
  @IsString()
  nome: string;

  @IsNumber()
  cursoId: number;
}
