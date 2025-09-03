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
import { AuthController } from 'src/auth/auth.controller';
import { UserController } from 'src/user/user.controller';
import { DisciplinaController } from 'src/disciplina/disciplina.controller';
import { CursoController } from 'src/curso/curso.controller';

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
  controllers: [
    AppController,
    AuthController,
    UserController,
    DisciplinaController,
    CursoController,
  ],
  providers: [JwtService],
})
export class AppModule {}
