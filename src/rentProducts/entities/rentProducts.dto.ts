import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateRentProductDto {
  @ApiProperty({
    description: `Name of the item`,
    example: 'Bike',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: `Description of the item (for example age restriction)`,
    example: '(only after 16)',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: `Image name (file stores on server)`,
    example: 'bike.png',
  })
  @IsString()
  image: string;

  @ApiProperty({
    description: `Array of rent prices (30min, 1h, 2h)`,
    example: [150, 275, 500],
  })
  @IsArray()
  prices: number[];
}

export class UpdateRentProductDto {
  @ApiPropertyOptional({
    description: `Name of the item`,
    example: 'Bike',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: `Description of the item (for example age restriction)`,
    example: '(only after 16)',
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiPropertyOptional({
    description: `Image name (file stores on server)`,
    example: 'bike.png',
  })
  @IsOptional()
  @IsString()
  image: string;

  @ApiPropertyOptional({
    description: `Array of rent prices (30min, 1h, 2h)`,
    example: [150, 275, 500],
  })
  @IsOptional()
  @IsArray()
  prices: number[];
}
