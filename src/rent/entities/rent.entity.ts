import { ApiProperty } from '@nestjs/swagger';

export class Rent {
  @ApiProperty()
  id: number;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  date: string;

  @ApiProperty()
  time: string;
}
