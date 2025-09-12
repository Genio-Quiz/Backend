import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateQuestaoDto } from './dto/create-questao.dto';
import { UpdateQuestaoDto } from './dto/update-questao.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Questao } from './entities/questao.entity';
import { DisciplinaService } from 'src/disciplina/disciplina.service';

@Injectable()
export class QuestaoService {
  constructor(
    @InjectRepository(Questao)
    private questaoRepository: Repository<Questao>,
    private disciplinaService: DisciplinaService,
  ) {}

  async create(createQuestaoDto: CreateQuestaoDto) {
    const disciplinaExiste = await this.disciplinaService.findByOneId(
      createQuestaoDto.disciplinaId,
    );
    console.log(disciplinaExiste);
    if (!disciplinaExiste) {
      throw new HttpException('Disciplina não existe', HttpStatus.NOT_FOUND);
    }
    const questao = this.questaoRepository.create(createQuestaoDto);
    await this.questaoRepository.save(questao);
    return questao;
  }

  async findAll() {
    const questoes = await this.questaoRepository.find({
      relations: ['disciplina'],
    });
    if (!questoes || questoes.length === 0) {
      throw new HttpException(
        'Nenhuma questão encontrada',
        HttpStatus.NOT_FOUND,
      );
    }
    return questoes;
  }

  async findOne(id: number) {
    const questao = await this.questaoRepository.findOne({ where: { id } });
    if (!questao) {
      throw new HttpException('Questão não encontrada', HttpStatus.NOT_FOUND);
    }
    return questao;
  }

  async update(id: number, updateQuestaoDto: UpdateQuestaoDto) {
    const questaoExiste = await this.questaoRepository.findOne({
      where: { id },
    });
    if (!questaoExiste) {
      throw new HttpException('Questão não encontrada', HttpStatus.NOT_FOUND);
    }

    const updatedQuestao = Object.assign(questaoExiste, updateQuestaoDto);
    const result = await this.questaoRepository.update(id, updatedQuestao);
    if (!result) {
      throw new HttpException(
        'Erro ao atualizar questão',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return result;
  }

  async remove(id: number) {
    const questaoExiste = await this.questaoRepository.findOne({
      where: { id },
    });
    if (!questaoExiste) {
      throw new HttpException('Questão não encontrada', HttpStatus.NOT_FOUND);
    }
    const result = await this.questaoRepository.delete(id);
    if (!result) {
      throw new HttpException(
        'Erro ao deletar questão',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return result;
  }
}
