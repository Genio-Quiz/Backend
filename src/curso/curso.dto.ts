import { IsString } from 'class-validator';

export class CreateCursoDto {
  @IsString()
  nome: string;
}
