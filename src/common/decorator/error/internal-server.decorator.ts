import { ApiInternalServerErrorResponse } from '@nestjs/swagger';

export const InternalServerErrorResponse = () =>
  ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: Error,
  });
