import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionarioDto } from './create-questionario.dto';

export class UpdateQuestionarioDto extends PartialType(CreateQuestionarioDto) {}
