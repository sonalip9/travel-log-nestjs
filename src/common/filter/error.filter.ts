import { Catch, ExceptionFilter } from '@nestjs/common';

@Catch(Error)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: Error) {
    console.error(exception);
  }
}
