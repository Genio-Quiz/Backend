import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Disciplina } from './disciplina.entity';
import { CreateDisciplinaDto } from './disciplina.dto';
import { CursoService } from './../curso/curso.service';

@Injectable()
export class DisciplinaService {
  constructor(
    @InjectRepository(Disciplina)
    private disciplinaRepository: Repository<Disciplina>,
    private cursoService: CursoService,
  ) {}

  async findAll(): Promise<Disciplina[]> {
    const disciplinas = await this.disciplinaRepository.find();
    if (!disciplinas || disciplinas.length === 0) {
      throw new Error('Nenhum disciplina encontrado');
    }

    return disciplinas;
  }

  async findByOneId(id: number): Promise<Disciplina | null> {
    const disciplina = await this.disciplinaRepository.findOneBy({ id });
    if (!disciplina) {
      throw new Error('Disciplina não encontrado');
    }

    return disciplina;
  }

  async findOnebyName(nome: string): Promise<Disciplina | null> {
    const disciplina = await this.disciplinaRepository.findOneBy({ nome });
    if (!disciplina) {
      throw new Error('Disciplina não encontrado');
    }

    return disciplina;
  }

  async save(disciplina: CreateDisciplinaDto): Promise<Disciplina> {
    const disciplinaExiste = await this.disciplinaRepository.findOneBy({
      nome: disciplina.nome,
    });
    if (disciplinaExiste) {
      throw new Error('Disciplina já existe');
    }

    const curso = await this.cursoService.findByOneId(disciplina.cursoId);
    if (!curso) {
      throw new Error('Curso não encontrado');
    }

    const newDisciplina = this.disciplinaRepository.create(disciplina);
    return this.disciplinaRepository.save(newDisciplina);
  }

  async update(
    id: number,
    disciplina: CreateDisciplinaDto,
  ): Promise<Disciplina> {
    const disciplinaExistente = await this.disciplinaRepository.findOneBy({
      id,
    });
    if (!disciplinaExistente) {
      throw new Error('Disciplina não encontrado');
    }

    const updatedDisciplina = Object.assign(disciplinaExistente, disciplina);
    const result = await this.disciplinaRepository.save(updatedDisciplina);
    if (!result) {
      throw new Error('Erro ao atualizar disciplina');
    }

    return result;
  }
}
