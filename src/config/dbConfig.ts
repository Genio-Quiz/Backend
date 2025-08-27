import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Curso } from 'src/curso/curso.entity';
import { Disciplina } from 'src/disciplina/disciplina.entity';
import { Questionario } from 'src/questionario/questionario.entity';
import { Questao } from 'src/questao/questao.entity';
import { Alternativa } from 'src/alternativa/alternativa.entity';
import { Resultado } from 'src/resultado/resultado.entity';

import dotenv from 'dotenv';

dotenv.config();

export default registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    synchronize: true,
    autoLoadEntities: true,

    entities: [
      User,
      Curso,
      Disciplina,
      Questionario,
      Questao,
      Alternativa,
      Resultado,
    ],
  }),
);
