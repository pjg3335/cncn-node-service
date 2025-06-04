import { Controller, Get } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get('/')
  async getTest() {
    await this.testService.add();
    const aa = await this.testService.getAll();
    return aa;
  }
}
