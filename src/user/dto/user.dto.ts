import { OmitType, PartialType, PickType } from '@nestjs/swagger';
import { User } from '../entity/user.entity';

export class UserDto extends User {}

export class UserIdDto extends PickType(UserDto, ['id'] as const) {}

export type UserId = UserDto['id'];

export class CreateUserDto extends OmitType(UserDto, ['id'] as const) {}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
