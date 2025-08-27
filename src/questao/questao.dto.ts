import { IsEnum, IsString, IsNumber } from 'class-validator';
import { Dificuldade } from './questao.entity';

export class CreateQuestaoDto {
  @IsEnum(Dificuldade)
  dificuldade: Dificuldade;

  @IsString()
  enunciado: string;

  @IsNumber()
  disciplinaId: number;
}
