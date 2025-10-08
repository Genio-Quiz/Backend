import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateResultadoDto } from './dto/create-resultado.dto';
import { UpdateResultadoDto } from './dto/update-resultado.dto';
import { Resultado } from './entities/resultado.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ResultadoService {
  constructor(
    @InjectRepository(Resultado)
    private questionarioRepository: Repository<Resultado>,
  ) {}

  create(createResultadoDto: CreateResultadoDto) {
    const resultado = this.questionarioRepository.create(createResultadoDto);
    return this.questionarioRepository.save(resultado);
  }

  findAll() {
    const resultados = this.questionarioRepository.find();
    return resultados;
  }

  findOne(id: string) {
    const resultado = this.questionarioRepository.findOne({ where: { id } });
    return resultado;
  }

  async update(id: string, updateResultadoDto: UpdateResultadoDto) {
    const resultado = await this.questionarioRepository.findOne({
      where: { id },
    });
    if (!resultado) {
      return new HttpException(
        'Resultado não encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedResultado = Object.assign(resultado, updateResultadoDto);
    return this.questionarioRepository.save(updatedResultado);
  }

  remove(id: string) {
    const resultado = this.questionarioRepository.delete({ id });
    return resultado;
  }
}
