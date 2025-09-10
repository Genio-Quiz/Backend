import { Module } from '@nestjs/common';
import { QuestaoService } from './questao.service';
import { QuestaoController } from './questao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Questao } from './entities/questao.entity';
import { DisciplinaModule } from 'src/disciplina/disciplina.module';

@Module({
  imports: [TypeOrmModule.forFeature([Questao]), DisciplinaModule],
  controllers: [QuestaoController],
  providers: [QuestaoService],
  exports: [QuestaoService],
})
export class QuestaoModule {}
