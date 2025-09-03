import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Disciplina } from 'src/disciplina/disciplina.entity';
import { CreateDisciplinaDto } from './disciplina.dto';
import { DisciplinaService } from './disciplina.service';

@Controller('disciplinas')
export class DisciplinaController {
  constructor(private readonly disciplinaService: DisciplinaService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<Disciplina[]> {
    return this.disciplinaService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findById(@Param('id') id: number): Promise<Disciplina | null> {
    return this.disciplinaService.findByOneId(Number(id));
  }

  @HttpCode(HttpStatus.OK)
  @Get('search/:name')
  async findByName(@Param('name') name: string): Promise<Disciplina | null> {
    return this.disciplinaService.findOnebyName(name);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() disciplina: CreateDisciplinaDto): Promise<Disciplina> {
    return this.disciplinaService.save(disciplina);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() disciplina: CreateDisciplinaDto,
  ): Promise<Disciplina> {
    return this.disciplinaService.update(id, disciplina);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ mensagem: string }> {
    return this.disciplinaService.remove(id);
  }
}
