import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

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

export class UpdateRentDto {
  @ApiPropertyOptional({
    description: `First name of the user`,
    example: 'James',
  })
  @IsOptional()
  @IsString()
  first_name: string;

  @ApiPropertyOptional({
    description: `Last name of the user`,
    example: 'Roberts',
  })
  @IsOptional()
  @IsString()
  last_name: string;

  @ApiPropertyOptional({
    description: `Reserved date for rent`,
    example: '2024-06-23',
  })
  @IsOptional()
  @IsString()
  date: string;

  @ApiPropertyOptional({
    description: `Reserved time for rent`,
    example: '16:12:00',
  })
  @IsOptional()
  @IsString()
  time: string;
}
