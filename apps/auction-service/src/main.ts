import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BigIntToNumberInterceptor, ZodExceptionFilter } from '@app/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalFilters(new ZodExceptionFilter());

  app.useGlobalInterceptors(new BigIntToNumberInterceptor());

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API에 대한 설명')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.port ?? 3000);
}
bootstrap();
