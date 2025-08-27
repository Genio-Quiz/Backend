import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import registerAs from '../config/dbConfig';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { DisciplinaModule } from 'src/disciplina/disciplina.module';
import { CursoModule } from 'src/curso/curso.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(registerAs()),
    TypeOrmModule.forFeature([User]),
    AuthModule,
    UserModule,
    DisciplinaModule,
    CursoModule,
  ],
  controllers: [AppController],
  providers: [JwtService],
})
export class AppModule {}
