import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateResultadoDto {
  @IsNumber()
  tempoSegundos: number;

  @IsDate()
  dataExecucao: Date;

  @IsString()
  idUsuario: string;

  @IsString()
  idQuestionario: string;
}
