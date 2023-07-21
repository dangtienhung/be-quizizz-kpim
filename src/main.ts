import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* doc swagger */
  const config = new DocumentBuilder()
    .setTitle('Quản lý API Quizizz')
    .setDescription('Quản lý API Quizizz')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  /* validate piple */
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
