import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

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
    description: `Rent price for 30 minutes`,
    example: 150,
  })
  @IsNumber()
  price_30min: number;

  @ApiProperty({
    description: `Rent price for 1 hour`,
    example: 275,
  })
  @IsNumber()
  price_1h: number;

  @ApiProperty({
    description: `Rent price for 2 hours`,
    example: 500,
  })
  @IsNumber()
  price_2h: number;
}

export class GetRentProductDto {
  @ApiProperty({
    description: `id`,
    example: '1',
  })
  id: number;

  @ApiProperty({
    description: `Name of the item`,
    example: 'Bike',
  })
  name: string;

  @ApiProperty({
    description: `Description of the item (for example age restriction)`,
    example: '(only after 16)',
  })
  description: string;

  @ApiProperty({
    description: `Image name (file stores on server)`,
    example: 'bike.png',
  })
  image: string;

  @ApiProperty({
    description: `Array of rent prices (30min, 1h, 2h)`,
    example: [150, 275, 500],
  })
  @IsArray()
  prices: number[];
}
