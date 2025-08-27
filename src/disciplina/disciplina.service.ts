import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Disciplina } from './disciplina.entity';
import { CreateDisciplinaDto } from './disciplina.dto';
import { CursoService } from 'src/curso/curso.service';

@Injectable()
export class DisciplinaService {
  constructor(
    @InjectRepository(Disciplina)
    private disciplinaRepository: Repository<Disciplina>,
    private cursoService: CursoService,
  ) {}

  async findAll(): Promise<Disciplina[]> {
    const disciplinas = await this.disciplinaRepository.find({
      relations: ['curso', 'questoes', 'questionarios'],
    });
    if (!disciplinas || disciplinas.length === 0) {
      throw new HttpException(
        'Nenhum disciplina encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    console.log(disciplinas);
    return disciplinas;
  }

  async findByOneId(id: number): Promise<Disciplina | null> {
    const disciplina = await this.disciplinaRepository.findOne({
      where: { id },
      relations: ['curso', 'questoes', 'questionarios'],
    });
    if (!disciplina) {
      throw new HttpException(
        'Disciplina não encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    console.log(disciplina);
    return disciplina;
  }

  async findOnebyName(nome: string): Promise<Disciplina | null> {
    const disciplina = await this.disciplinaRepository.findOne({
      where: { nome },
      relations: ['curso', 'questoes', 'questionarios'],
    });
    if (!disciplina) {
      throw new HttpException(
        'Disciplina não encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    return disciplina;
  }

  async save(disciplinaDto: CreateDisciplinaDto): Promise<Disciplina> {
    const disciplinaExiste = await this.disciplinaRepository.findOne({
      where: { nome: disciplinaDto.nome },
    });
    if (disciplinaExiste) {
      throw new HttpException('Disciplina já existe', HttpStatus.CONFLICT);
    }

    const curso = await this.cursoService.findByOneId(disciplinaDto.cursoId);
    if (!curso) {
      throw new HttpException('Curso não encontrado', HttpStatus.NOT_FOUND);
    }

    const newDisciplina = this.disciplinaRepository.create({
      nome: disciplinaDto.nome,
      curso: curso,
    });

    const savedDisciplina = await this.disciplinaRepository.save(newDisciplina);

    return savedDisciplina;
  }

  async update(
    id: number,
    disciplina: CreateDisciplinaDto,
  ): Promise<Disciplina> {
    const disciplinaExistente = await this.disciplinaRepository.findOneBy({
      id,
    });
    if (!disciplinaExistente) {
      throw new HttpException(
        'Disciplina não encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedDisciplina = Object.assign(disciplinaExistente, disciplina);
    const result = await this.disciplinaRepository.save(updatedDisciplina);
    if (!result) {
      throw new HttpException(
        'Erro ao atualizar disciplina',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return result;
  }

  async remove(id: number): Promise<{mensagem: string}> {
    const disciplinaExistente = await this.disciplinaRepository.findOneBy({
      id,
    });
    if (!disciplinaExistente) {
      throw new HttpException(
        'Disciplina não encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.disciplinaRepository.remove(disciplinaExistente);
    return {
      mensagem: "Disciplina deletada com sucesso"
    }
  }
}
