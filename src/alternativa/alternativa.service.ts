import { QuestaoService } from './../questao/questao.service';
import { Injectable } from '@nestjs/common';
import { CreateAlternativaDto } from './dto/create-alternativa.dto';
import { Questao } from 'src/questao/entities/questao.entity';
import { UpdateAlternativaDto } from './dto/update-alternativa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestaoService } from 'src/questao/questao.service';
import { Repository } from 'typeorm';
import { retry } from 'rxjs';

@Injectable()
export class AlternativaService {
  constructor(
    @InjectRepository(Questao) private questaoRepository: Repository<Questao>,
    private questaoService: QuestaoService,
  ) {}

  async create(createAlternativaDto: CreateAlternativaDto) {
    const questaoExiste = await this.questaoService.findOne(
      createAlternativaDto.questaoId,
    );
    return;
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
