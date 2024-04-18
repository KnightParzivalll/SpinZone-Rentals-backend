import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class RentProduct {
  @ApiProperty({
    description: `id`,
    example: '1',
  })
  @IsNumber()
  id: number;

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
