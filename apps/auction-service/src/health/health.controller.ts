import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('health')
export class HealthController {
  @Get('liveness')
  @ApiOkResponse({ type: Number })
  liveness() {
    return { status: 'ok' };
  }

  @Get('readiness')
  readiness() {
    return { status: 'ok' };
  }
}
