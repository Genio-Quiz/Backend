import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Disciplina } from './disciplina.entity';
import { DisciplinaService } from './disciplina.service';
import { DisciplinaController } from './disciplina.controller';
import { CursoService } from 'src/curso/curso.service';

@Module({
  imports: [TypeOrmModule.forFeature([Disciplina])],
  providers: [DisciplinaService, CursoService],
  controllers: [DisciplinaController],
})
export class DisciplinaModule {}
