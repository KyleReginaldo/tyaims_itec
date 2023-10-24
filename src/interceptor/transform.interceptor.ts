import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable, map } from 'rxjs';
  export interface Response<T> {
    data: T;
  }
  
  @Injectable()
  export class TransformInterceptor<T>
    implements NestInterceptor<T, Response<T>>
  {
    intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Observable<Response<T>> {
      const ctx = context.switchToHttp();
      const { statusCode } = ctx.getResponse();
      return next.handle().pipe(
        map((data) => ({
          statusCode: statusCode,
          timestamp: new Date().toISOString(),
          message:
            statusCode === 201 || statusCode === 200 ? 'success' : 'failed',
          data: data,
        })),
      );
    }
  }