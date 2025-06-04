import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from './const';

export class AppException extends HttpException {
  constructor(response: { message: string; code: ErrorCode }, status: HttpStatus) {
    super(response, status);
  }
}
