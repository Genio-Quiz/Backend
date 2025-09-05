import { Module } from '@nestjs/common';
import { AlternativaService } from './alternativa.service';
import { AlternativaController } from './alternativa.controller';

@Module({
  controllers: [AlternativaController],
  providers: [AlternativaService],
})
export class AlternativaModule {}
