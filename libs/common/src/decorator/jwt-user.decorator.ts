import { createParamDecorator, ExecutionContext, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { User } from '../types/user';
import { AppException } from '../common/app.exception';
import { ErrorCode } from '../common';

export const JwtUser = createParamDecorator((data: unknown, ctx: ExecutionContext): User => {
  // userToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlZjNjZjBmMy02MmI4LTQzNzEtYTAxNC02NDNmODIzMjNlZmQiLCJpYXQiOjE3NDgwODQ0MTZ9.tgqWbCcFhlGajZXiOSLa7tg9A3r0sYVNmGj8sx3nLJM
  // adminToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlZjNjZjBmMy02MmI4LTQzNzEtYTAxNC02NDNmODIzMjNlZmQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTcwMDQ2NTZ9.-ZlQ1vmiXGZ16YVCgTbn_pGmKxKKzE2fvz3vnMQW93U
  const request = ctx.switchToHttp().getRequest();
  const authHeader = request.headers['authorization'];
  if (!authHeader?.startsWith('Bearer ')) {
    throw new AppException({ message: 'JWT 토큰 에러', code: ErrorCode.UNAUTHORIZED }, HttpStatus.UNAUTHORIZED);
  }
  const token = authHeader?.split(' ')[1];
  try {
    return jwt.decode(token) as User;
  } catch (err) {
    throw new AppException({ message: 'JWT 토큰 에러', code: ErrorCode.UNAUTHORIZED }, HttpStatus.UNAUTHORIZED);
  }
});
