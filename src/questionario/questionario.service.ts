import { Injectable } from '@nestjs/common';
import { CreateQuestionarioDto } from './dto/create-questionario.dto';
import { UpdateQuestionarioDto } from './dto/update-questionario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Questionario } from './entities/questionario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionarioService {
  constructor(
    @InjectRepository(Questionario)
    private questionarioRepository: Repository<Questionario>,
  ) {}

  create(createQuestionarioDto: CreateQuestionarioDto) {
    return 'This action adds a new questionario';
  }

  findAll() {
    return `This action returns all questionario`;
  }

  findOne(id: number) {
    return `This action returns a #${id} questionario`;
  }

  update(id: number, updateQuestionarioDto: UpdateQuestionarioDto) {
    return `This action updates a #${id} questionario`;
  }

  remove(id: number) {
    return `This action removes a #${id} questionario`;
  }
}
