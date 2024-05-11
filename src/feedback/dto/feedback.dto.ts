import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Feedback } from '../entity/feedback.entity';
import { UserDto, UserIdDto } from 'src/user/dto/user.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class FeedbackDto extends Feedback {
  @ApiProperty({
    type: UserDto,
    description: 'User information',
  })
  user: UserDto;
}

export class FeedbackByUserDto extends OmitType(FeedbackDto, [
  'user',
] as const) {}

export type FeedbackId = Feedback['id'];

export class CreateFeedbackDto extends OmitType(FeedbackDto, [
  'id',
  'user',
] as const) {
  @ApiProperty({
    type: UserIdDto,
    description: `User's id`,
  })
  @ValidateNested()
  @Type(() => UserIdDto)
  user: UserIdDto;
}
