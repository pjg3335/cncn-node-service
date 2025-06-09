import { createParamDecorator, ExecutionContext, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { User } from '../types/user';
import { AppException } from '../common/app.exception';
import { ErrorCode } from '../common';

export const JwtUser = createParamDecorator((data: unknown, ctx: ExecutionContext): User => {
  // userToken1. eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlM2VkZWM4OS0yMjRkLTRkNmEtOGM1NS0zNDcyMzJkYTM0YzIifQ.kaK2nXssT_yG3Z5q0jJnBhXBQFnbZoiQ-UpQENKgwBg
  // userToken2. eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkMzhkNjk0Yy00MDY0LTQyNTgtYTUzMy1lNzE3NTI3YmU2OWQifQ.B1YVXsLtYtorkKiiHpZbWZOzv6GMkXaENmBcCvX-cto
  // userToken3. eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxOWRiMGM2NS1mN2M5LTQ2NmQtOGY1OC1lNTQ0M2U3MGQ5ZWQifQ.UkhUHpZfLKr3NVbrfhPiSU509omWQw7Q-jOBsxxUfW4
  // userToken4. eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1NDQxNWZhZS0xZTcyLTRlNzUtODBiNi01MTBkMDNhMTRmMDEifQ.strt759OzlLoQ4tOPEdU7yMH9CoGBmgm0NJ_KRd_8XA
  // userToken5. eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkOGRlYjA3My01Y2YzLTQ4NjAtYjExMC1lMjNhMmE5YmI5MTcifQ.ycu5S2Afo0vOoMnzHKFjUo1dGBE9GzmS2cu4JDRs98M

  // adminToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlZjNjZjBmMy02MmI4LTQzNzEtYTAxNC02NDNmODIzMjNlZmQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTcwMDQ2NTZ9.-ZlQ1vmiXGZ16YVCgTbn_pGmKxKKzE2fvz3vnMQW93U
  const request = ctx.switchToHttp().getRequest();
  const authHeader = request.headers['authorization'];
  if (!authHeader?.startsWith('Bearer ')) {
    throw new AppException({ message: 'JWT 토큰 형식 에러', code: ErrorCode.UNAUTHORIZED }, HttpStatus.UNAUTHORIZED);
  }
  const token = authHeader?.split(' ')[1];
  try {
    return jwt.decode(token) as User;
  } catch (err) {
    throw new AppException({ message: 'JWT 토큰 에러', code: ErrorCode.UNAUTHORIZED }, HttpStatus.UNAUTHORIZED);
  }
});
