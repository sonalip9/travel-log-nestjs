import { ApiForbiddenResponse } from '@nestjs/swagger';

export const ForbiddenResponse = (description: string) =>
  ApiForbiddenResponse({
    description,
    schema: { example: { message: 'Forbidden', statusCode: 403 } },
  });
