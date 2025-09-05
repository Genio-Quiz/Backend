import { PartialType } from '@nestjs/mapped-types';
import { CreateAlternativaDto } from './create-alternativa.dto';

export class UpdateAlternativaDto extends PartialType(CreateAlternativaDto) {}
