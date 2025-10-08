import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    const questionario = this.questionarioRepository.create(
      createQuestionarioDto,
    );
    return this.questionarioRepository.save(questionario);
  }

  findAll() {
    const questionarios = this.questionarioRepository.find();
    return questionarios;
  }

  findOne(id: string) {
    const questionario = this.questionarioRepository.findOne({ where: { id } });
    return questionario;
  }

  async update(id: string, updateQuestionarioDto: UpdateQuestionarioDto) {
    const questionario = await this.questionarioRepository.findOne({
      where: { id },
    });
    if (!questionario) {
      return new HttpException(
        'Questionario não encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedQuestionario = Object.assign(
      questionario,
      updateQuestionarioDto,
    );
    return this.questionarioRepository.save(updatedQuestionario);
  }

  remove(id: string) {
    const questionario = this.questionarioRepository.delete({ id });
    return questionario;
  }
}
