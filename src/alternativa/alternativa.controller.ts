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
import { AlternativaService } from './alternativa.service';
import { CreateAlternativaDto } from './dto/create-alternativa.dto';
import { UpdateAlternativaDto } from './dto/update-alternativa.dto';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Controller('alternativa')
export class AlternativaController {
  constructor(private readonly alternativaService: AlternativaService) {}

  @Post()
  @UseGuards(AdminGuard)
  create(@Body() createAlternativaDto: CreateAlternativaDto) {
    return this.alternativaService.create(createAlternativaDto);
  }

  @Get(':correta')
  findRight(@Param('id') id: string) {
    const alternativa = this.alternativaService.findOne(+id) 
    return this.alternativaService.findARightlternative(+alternativa)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alternativaService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  update(
    @Param('id') id: string,
    @Body() updateAlternativaDto: UpdateAlternativaDto,
  ) {
    return this.alternativaService.update(+id, updateAlternativaDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.alternativaService.remove(+id);
  }
}
