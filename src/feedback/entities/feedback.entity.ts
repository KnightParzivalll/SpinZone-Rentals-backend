import { ApiProperty } from '@nestjs/swagger';

export type Gender = 'male' | 'female';
export const genderValues = ['male', 'female'];

export class Feedback {
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
    description: `Feedback text`,
    example: 'Some good text',
  })
  text: string;

  @ApiProperty({
    enum: genderValues,
    description: `A gender of the user`,
    example: 'male',
  })
  gender: Gender;
}
