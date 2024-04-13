import { IsString, IsIn } from 'class-validator';

export class CreateFeedbackDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  text: string;

  @IsIn(['male', 'female'])
  gender: string;
}
