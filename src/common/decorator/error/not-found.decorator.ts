import { ApiNotFoundResponse } from '@nestjs/swagger';

export const NotFoundResponse = ({
  description,
  message,
}: {
  description?: string;
  message?: string;
}) =>
  ApiNotFoundResponse({
    description,
    schema: {
      example: { error: 'Not Found', message, statusCode: 404 },
    },
  });
