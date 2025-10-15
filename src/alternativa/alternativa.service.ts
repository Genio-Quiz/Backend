import { HttpStatus, HttpException, Injectable } from '@nestjs/common';
import { CreateAlternativaDto } from './dto/create-alternativa.dto';
import { UpdateAlternativaDto } from './dto/update-alternativa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestaoService } from 'src/questao/questao.service';
import { Repository } from 'typeorm';
import { Alternativa } from './entities/alternativa.entity';

@Injectable()
export class AlternativaService {
  constructor(
    @InjectRepository(Alternativa)
    private alternativaRepository: Repository<Alternativa>,
    private questaoService: QuestaoService,
  ) {}

  async create(createAlternativaDto: CreateAlternativaDto) {
    const questaoExiste = await this.questaoService.findOne(
      createAlternativaDto.questaoId,
    );

    if (!questaoExiste) {
      throw new HttpException('Questão não encontrada', HttpStatus.NOT_FOUND);
    }

    const alternativa = this.alternativaRepository.create(createAlternativaDto);
    await this.alternativaRepository.save(alternativa);

    return alternativa;
  }

  async findOne(id: number) {
    const alternativa = await this.alternativaRepository.findOne({
      where: { id },
      relations: ['questao'],
    });

    if (!alternativa) {
      throw new HttpException(
        'Alternativa não encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    return alternativa;
  }

  async findARightlternative(id: number) {
    const es
  }

  async findByQuestionId(questaoId: number) {
    const alternativa = await this.alternativaRepository.find({
      where: { questao: { id: questaoId } },
      relations: ['questao'],
    });

    if (!alternativa) {
      throw new HttpException(
        'Alternativa não encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    return alternativa;
  }

  async update(id: number, updateAlternativaDto: UpdateAlternativaDto) {
    const alternativa = await this.alternativaRepository.findOne({
      where: { id },
    });

    if (!alternativa) {
      throw new HttpException(
        'Alternativa não encontrada',
        HttpStatus.NOT_FOUND,
      );
    }
    Object.assign(alternativa, updateAlternativaDto);
    const result = await this.alternativaRepository.save(alternativa);
    if (!result) {
      throw new HttpException(
        'Erro ao atualizar alternativa',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return result;
  }

  async remove(id: number) {
    const alternativa = await this.alternativaRepository.findOne({
      where: { id },
    });
    if (!alternativa) {
      throw new HttpException(
        'Alternativa não encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.alternativaRepository.delete(id);
    return { message: 'Alternativa removida com sucesso' };
  }
}
