import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BigIntToNumberInterceptor, ZodExceptionFilter } from '@app/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';
import type { Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.enableCors({
    origin: /^http:\/\/localhost(:\d+)?$/,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });

  app.useGlobalFilters(new ZodExceptionFilter());

  app.useGlobalInterceptors(new BigIntToNumberInterceptor());

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API에 대한 설명')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer('/auction-service')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.use('/v3/api-docs', (_: Request, res: Response) => res.json(document));
  SwaggerModule.setup('/swagger-ui', app, () => document, {
    swaggerUrl: '/v3/api-docs',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
