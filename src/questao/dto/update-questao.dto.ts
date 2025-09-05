import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestaoDto } from './create-questao.dto';

export class UpdateQuestaoDto extends PartialType(CreateQuestaoDto) {}
