import { Module } from '@nestjs/common';
import { QuestionarioService } from './questionario.service';
import { QuestionarioController } from './questionario.controller';

@Module({
  controllers: [QuestionarioController],
  providers: [QuestionarioService],
})
export class QuestionarioModule {}
