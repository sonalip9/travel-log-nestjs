import { ApiUnauthorizedResponse } from '@nestjs/swagger';

export const UnauthorizedResponse = () =>
  ApiUnauthorizedResponse({
    description: 'Unauthorized',
    schema: { example: { message: 'Unauthorized', statusCode: 401 } },
  });
