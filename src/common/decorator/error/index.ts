import { HttpStatus } from '@nestjs/common';
import { ApiResponseOptions } from '@nestjs/swagger';
import { ApiErrorDecorator } from './error.decorator';

export function NotFoundError(
  message = 'Not found',
  description?: string,
  options?: ApiResponseOptions,
) {
  return ApiErrorDecorator(HttpStatus.NOT_FOUND, message, description, options);
}
