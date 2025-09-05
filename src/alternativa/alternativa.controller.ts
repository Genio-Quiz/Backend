import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AlternativaService } from './alternativa.service';
import { CreateAlternativaDto } from './dto/create-alternativa.dto';
import { UpdateAlternativaDto } from './dto/update-alternativa.dto';

@Controller('alternativa')
export class AlternativaController {
  constructor(private readonly alternativaService: AlternativaService) {}

  @Post()
  create(@Body() createAlternativaDto: CreateAlternativaDto) {
    return this.alternativaService.create(createAlternativaDto);
  }

  @Get()
  findAll() {
    return this.alternativaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alternativaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAlternativaDto: UpdateAlternativaDto,
  ) {
    return this.alternativaService.update(+id, updateAlternativaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alternativaService.remove(+id);
  }
}
