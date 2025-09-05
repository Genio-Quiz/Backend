import { PartialType } from '@nestjs/mapped-types';
import { CreateResultadoDto } from './create-resultado.dto';

export class UpdateResultadoDto extends PartialType(CreateResultadoDto) {}
