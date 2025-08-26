import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Curso } from './curso.entity';
import { CursoController } from './curso.controller';
import { CursoService } from './curso.service';

@Module({
  imports: [TypeOrmModule.forFeature([Curso])],
  providers: [CursoService],
  controllers: [CursoController],
  exports: [CursoService],
})
export class CursoModule {}
