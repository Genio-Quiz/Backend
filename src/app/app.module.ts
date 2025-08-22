import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import registerAs from '../config/dbConfig';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(registerAs())],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
