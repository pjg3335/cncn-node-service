import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  InternalServerErrorException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BigIntToNumberInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map(bigIntToNumber));
  }
}

function bigIntToNumber(obj: any): any {
  if (typeof obj === 'bigint') {
    const num = Number(obj);
    if (!Number.isSafeInteger(num)) {
      throw new InternalServerErrorException(`범위를 벗어나 파싱할 수 없습니다: ${obj}`);
    }
    return num;
  }

  if (Array.isArray(obj)) {
    return obj.map(bigIntToNumber);
  }

  if (obj !== null && typeof obj === 'object') {
    const result: any = {};
    for (const key in obj) {
      result[key] = bigIntToNumber(obj[key]);
    }
    return result;
  }

  return obj;
}
