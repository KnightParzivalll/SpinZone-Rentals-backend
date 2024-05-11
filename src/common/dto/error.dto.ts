import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ErrorDTO {
  @ApiProperty({ default: 'Bad Request' })
  message: string;

  @ApiProperty({ enum: HttpStatus, default: HttpStatus.BAD_REQUEST })
  statusCode: HttpStatus;
}

export class OKResponse extends ErrorDTO {
  @ApiProperty({
    example: '...',
  })
  message: string;

  @ApiProperty({
    example: '200',
  })
  statusCode: HttpStatus.OK;
}
