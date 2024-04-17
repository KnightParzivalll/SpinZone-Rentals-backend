import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRentDto {
  @ApiProperty({
    description: `First name of the user`,
    example: 'James',
  })
  @IsString()
  first_name: string;

  @ApiProperty({
    description: `Last name of the user`,
    example: 'Roberts',
  })
  @IsString()
  last_name: string;

  @ApiProperty({
    description: `Reserved date for rent`,
    example: '2024-06-23',
  })
  @IsString()
  date: string;

  @ApiProperty({
    description: `Reserved time for rent`,
    example: '16:12:00',
  })
  @IsString()
  time: string;
}
