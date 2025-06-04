import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [TestController],
  providers: [TestService],
  imports: [PrismaModule],
})
export class TestModule {}
