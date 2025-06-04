import { NestFactory } from '@nestjs/core';
import { CatalogQueryServiceModule } from './catalog-query-service.module';

async function bootstrap() {
  const app = await NestFactory.create(CatalogQueryServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
