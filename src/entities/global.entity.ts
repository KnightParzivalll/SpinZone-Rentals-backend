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

export class BadRequestResponse {
  @ApiProperty({
    example: '400',
  })
  @ApiProperty()
  statusCode: HttpStatus.BAD_REQUEST;

  @ApiProperty({
    example: '...',
  })
  message: string;
}

export class OKResponse {
  @ApiProperty({
    example: '200',
  })
  @ApiProperty()
  statusCode: HttpStatus.OK;

  @ApiProperty({
    example: '...',
  })
  message: string;
}
