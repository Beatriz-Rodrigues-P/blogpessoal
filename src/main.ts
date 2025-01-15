import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  process.env.TZ="-03:00"

  //Habilitamos globalmente a validação de dados
  app.useGlobalPipes(new ValidationPipe());

  //Compartilhamento de origem cruzada - SOFEA tem servidores diferentes pro front e back
  //É ESSENCIAL ATIVAR PRA CONECTAR COM O FRONT
  app.enableCors();

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
