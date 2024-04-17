import { ApiProperty } from '@nestjs/swagger';

import { HttpStatus, ValidationError } from '@nestjs/common';

export class ValidationException {
  @ApiProperty({
    example: '400',
  })
  statusCode: HttpStatus;

  @ApiProperty()
  message: ValidationError[];

  @ApiProperty({
    example: 'Bad Request',
  })
  error: string;
}
