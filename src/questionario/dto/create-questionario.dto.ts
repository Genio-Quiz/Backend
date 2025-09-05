import { IsNumber, IsString } from 'class-validator';

export class CreateQuestionarioDto {
  @IsString()
  nome: string;

  @IsNumber()
  idDisciplina: number;
}
