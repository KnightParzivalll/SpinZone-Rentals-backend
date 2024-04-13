import { ApiProperty } from '@nestjs/swagger';

export class Feedback {
  @ApiProperty()
  id: number;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  text: string;

  @ApiProperty()
  gender: string;
}
