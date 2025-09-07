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
  UseGuards,
} from '@nestjs/common';
import { CursoService } from './curso.service';
import { Curso } from './curso.entity';
import { CreateCursoDto } from './curso.dto';
import { AdminGuard } from 'src/guards/admin/admin.guard';

@Controller('cursos')
export class CursoController {
  constructor(private readonly cursoService: CursoService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<Curso[]> {
    return this.cursoService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findById(@Param('id') id: number): Promise<Curso | null> {
    return this.cursoService.findByOneId(Number(id));
  }

  @HttpCode(HttpStatus.OK)
  @Get('search/:name')
  async findByName(@Param('name') name: string): Promise<Curso | null> {
    return this.cursoService.findOnebyName(name);
  }

  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() curso: CreateCursoDto): Promise<Curso> {
    return this.cursoService.save(curso);
  }

  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() curso: CreateCursoDto,
  ): Promise<Curso> {
    return this.cursoService.update(id, curso);
  }

  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ mensagem: string }> {
    return this.cursoService.remove(id);
  }
}
