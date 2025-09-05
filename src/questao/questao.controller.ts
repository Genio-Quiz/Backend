import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestaoService } from './questao.service';
import { CreateQuestaoDto } from './dto/create-questao.dto';
import { UpdateQuestaoDto } from './dto/update-questao.dto';

@Controller('questao')
export class QuestaoController {
  constructor(private readonly questaoService: QuestaoService) {}

  @Post()
  create(@Body() createQuestaoDto: CreateQuestaoDto) {
    return this.questaoService.create(createQuestaoDto);
  }

  @Get()
  findAll() {
    return this.questaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questaoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestaoDto: UpdateQuestaoDto) {
    return this.questaoService.update(+id, updateQuestaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questaoService.remove(+id);
  }
}
