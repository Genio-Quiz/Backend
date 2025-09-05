import { Injectable } from '@nestjs/common';
import { CreateQuestionarioDto } from './dto/create-questionario.dto';
import { UpdateQuestionarioDto } from './dto/update-questionario.dto';

@Injectable()
export class QuestionarioService {
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
