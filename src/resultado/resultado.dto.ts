import { IsDate, IsNumber } from 'class-validator';

export class CreateResultadoDto {
  @IsNumber()
  tempoSegundos: number;

  @IsDate()
  dataExecucao: Date;

  @IsNumber()
  idUsuario: number;

  @IsNumber()
  idQuestionario: number;
}
