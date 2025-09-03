import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    const cursos = await this.cursoRepository.find({
      relations: ['disciplinas'],
    });
    if (!cursos || cursos.length === 0) {
      throw new HttpException('Nenhum curso encontrado', HttpStatus.NOT_FOUND);
    }
    console.log(cursos);

    return cursos;
  }

  async findByOneId(id: number): Promise<Curso | null> {
    const curso = await this.cursoRepository.findOne({
      where: { id },
      relations: ['disciplinas'],
    });
    if (!curso) {
      throw new HttpException('Curso não encontrado', HttpStatus.NOT_FOUND);
    }

    console.log(curso);

    return curso;
  }

  async findOnebyName(nome: string): Promise<Curso | null> {
    const curso = await this.cursoRepository.findOne({
      where: { nome },
      relations: ['disciplinas'],
    });
    if (!curso) {
      throw new HttpException('Curso não encontrado', HttpStatus.NOT_FOUND);
    }

    return curso;
  }

  async save(curso: CreateCursoDto): Promise<Curso> {
    const cursoExiste = await this.cursoRepository.findOneBy({
      nome: curso.nome,
    });
    if (cursoExiste) {
      throw new HttpException('Curso já existe', HttpStatus.CONFLICT);
    }

    const newCurso = this.cursoRepository.create(curso);
    return this.cursoRepository.save(newCurso);
  }

  async update(id: number, curso: CreateCursoDto): Promise<Curso> {
    const cursoExistente = await this.cursoRepository.findOneBy({ id });
    if (!cursoExistente) {
      throw new HttpException('Curso não encontrado', HttpStatus.NOT_FOUND);
    }

    const updatedCurso = Object.assign(cursoExistente, curso);
    const result = await this.cursoRepository.save(updatedCurso);
    if (!result) {
      throw new HttpException(
        'Erro ao atualizar curso',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return result;
  }

  async remove(id: number): Promise<{ mensagem: string }> {
    const cursoExistente = await this.cursoRepository.findOneBy({ id });
    if (!cursoExistente) {
      throw new HttpException('Curso não encontrado', HttpStatus.NOT_FOUND);
    }

    await this.cursoRepository.delete(id);
    return {
      mensagem: 'Curso deletado com sucesso',
    };
  }
}
