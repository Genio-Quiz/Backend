import { Module } from '@nestjs/common';
import { ResultadoService } from './resultado.service';
import { ResultadoController } from './resultado.controller';

@Module({
  controllers: [ResultadoController],
  providers: [ResultadoService],
})
export class ResultadoModule {}
