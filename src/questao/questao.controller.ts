import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { QuestaoService } from './questao.service';
import { CreateQuestaoDto } from './dto/create-questao.dto';
import { UpdateQuestaoDto } from './dto/update-questao.dto';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Controller('questoes')
export class QuestaoController {
  constructor(private readonly questaoService: QuestaoService) {}

  @Post()
  @UseGuards(AdminGuard)
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
  @UseGuards(AdminGuard)
  update(@Param('id') id: string, @Body() updateQuestaoDto: UpdateQuestaoDto) {
    return this.questaoService.update(+id, updateQuestaoDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.questaoService.remove(+id);
  }
}
