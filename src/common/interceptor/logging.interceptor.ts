import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();

        const time = Date.now() - now;
        // eslint-disable-next-line no-console
        console.log(
          `[${request.method}] ${request.url} ${response.statusCode} - ${time}ms`,
        );
      }),
    );
  }
}
