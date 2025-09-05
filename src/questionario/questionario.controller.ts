import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuestionarioService } from './questionario.service';
import { CreateQuestionarioDto } from './dto/create-questionario.dto';
import { UpdateQuestionarioDto } from './dto/update-questionario.dto';

@Controller('questionario')
export class QuestionarioController {
  constructor(private readonly questionarioService: QuestionarioService) {}

  @Post()
  create(@Body() createQuestionarioDto: CreateQuestionarioDto) {
    return this.questionarioService.create(createQuestionarioDto);
  }

  @Get()
  findAll() {
    return this.questionarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionarioService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionarioDto: UpdateQuestionarioDto,
  ) {
    return this.questionarioService.update(+id, updateQuestionarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionarioService.remove(+id);
  }
}
