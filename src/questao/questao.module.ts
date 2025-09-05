import { Module } from '@nestjs/common';
import { QuestaoService } from './questao.service';
import { QuestaoController } from './questao.controller';

@Module({
  controllers: [QuestaoController],
  providers: [QuestaoService],
})
export class QuestaoModule {}
