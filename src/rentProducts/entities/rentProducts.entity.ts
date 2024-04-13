import { ApiProperty } from '@nestjs/swagger';

export class RentProduct {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  prices: number[];
}
