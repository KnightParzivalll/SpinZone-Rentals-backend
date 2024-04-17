import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsIn } from 'class-validator';
import { Gender, genderValues } from './feedback.entity';

export class CreateFeedbackDto {
  @IsString()
  @ApiProperty({
    description: `First name of the user`,
    example: 'James',
  })
  first_name: string;

  @IsString()
  @ApiProperty({
    description: `Last name of the user`,
    example: 'Roberts',
  })
  last_name: string;

  @IsString()
  @ApiProperty({
    description: `Feedback text`,
    example: 'Some good text',
  })
  text: string;

  @IsIn(genderValues)
  @ApiProperty({
    enum: genderValues,
    default: 'unknown',
    description: `A gender of the user`,
    example: 'male',
  })
  gender: Gender;
}
