import { ApiProperty } from '@nestjs/swagger';

export class Rent {
  @ApiProperty({
    description: `id`,
    example: '1',
  })
  id: number;

  @ApiProperty({
    description: `First name of the user`,
    example: 'James',
  })
  first_name: string;

  @ApiProperty({
    description: `Last name of the user`,
    example: 'Roberts',
  })
  last_name: string;

  @ApiProperty({
    description: `Reserved date for rent`,
    example: '2024-06-23',
  })
  date: string;

  @ApiProperty({
    description: `Reserved time for rent`,
    example: '16:12:00',
  })
  time: string;
}
