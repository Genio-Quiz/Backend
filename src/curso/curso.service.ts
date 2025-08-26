import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Curso } from './curso.entity';
import { CreateCursoDto } from './curso.dto';

@Injectable()
export class CursoService {
  constructor(
    @InjectRepository(Curso)
    private cursoRepository: Repository<Curso>,
  ) {}

  async findAll(): Promise<Curso[]> {
    const cursos = await this.cursoRepository.find();
    if (!cursos || cursos.length === 0) {
      throw new Error('Nenhum curso encontrado');
    }

    return cursos;
  }

  async findByOneId(id: number): Promise<Curso | null> {
    const curso = await this.cursoRepository.findOneBy({ id });
    if (!curso) {
      throw new Error('Curso não encontrado');
    }

    return curso;
  }

  async findOnebyName(nome: string): Promise<Curso | null> {
    const curso = await this.cursoRepository.findOneBy({ nome });
    if (!curso) {
      throw new Error('Curso não encontrado');
    }

    return curso;
  }

  async save(curso: CreateCursoDto): Promise<Curso> {
    const cursoExiste = await this.cursoRepository.findOneBy({
      nome: curso.nome,
    });
    if (cursoExiste) {
      throw new Error('Curso já existe');
    }

    const newCurso = this.cursoRepository.create(curso);
    return this.cursoRepository.save(newCurso);
  }

  async update(id: number, curso: CreateCursoDto): Promise<Curso> {
    const cursoExistente = await this.cursoRepository.findOneBy({ id });
    if (!cursoExistente) {
      throw new Error('Curso não encontrado');
    }

    const updatedCurso = Object.assign(cursoExistente, curso);
    const result = await this.cursoRepository.save(updatedCurso);
    if (!result) {
      throw new Error('Erro ao atualizar curso');
    }

    return result;
  }
}
