import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { ZodError } from 'zod';
import type { Response } from 'express';
import { ErrorCode } from '../utils';

@Catch(ZodError)
export class ZodExceptionFilter implements ExceptionFilter {
  catch(exception: ZodError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    const error = exception.errors[0];
    if (!error) {
      res.status(500).json({
        message: '유효성 검사 오류',
      });
    } else {
      res.status(400).json({
        code: ErrorCode.VALIDATION_ERROR,
        message: error.message,
      });
    }
  }
}
