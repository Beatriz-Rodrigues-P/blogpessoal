import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Blog Pessoal')
  .setDescription('Projeto Blog Pessoal')
  .setContact("Generation Brasil","http://www.generationbrasil.online","generation@email.com")
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  process.env.TZ="-03:00"

  //Habilitamos globalmente a validação de dados
  app.useGlobalPipes(new ValidationPipe());

  //Compartilhamento de origem cruzada - SOFEA tem servidores diferentes pro front e back
  //É ESSENCIAL ATIVAR PRA CONECTAR COM O FRONT
  app.enableCors();

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
