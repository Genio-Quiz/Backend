import { Injectable } from '@nestjs/common';
import { CreateAlternativaDto } from './dto/create-alternativa.dto';
import { UpdateAlternativaDto } from './dto/update-alternativa.dto';

@Injectable()
export class AlternativaService {
  create(createAlternativaDto: CreateAlternativaDto) {
    return 'This action adds a new alternativa';
  }

  findAll() {
    return `This action returns all alternativa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} alternativa`;
  }

  update(id: number, updateAlternativaDto: UpdateAlternativaDto) {
    return `This action updates a #${id} alternativa`;
  }

  remove(id: number) {
    return `This action removes a #${id} alternativa`;
  }
}
