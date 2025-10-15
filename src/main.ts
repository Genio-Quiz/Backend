import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
  };

  app.enableCors(corsOptions);

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser(process.env.SECRET));

  await app.listen(process.env.APP_PORT ?? 3000);
}

void bootstrap();
