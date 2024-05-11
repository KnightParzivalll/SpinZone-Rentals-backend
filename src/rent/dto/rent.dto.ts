import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Rent } from '../entity/rent.entity';
import { Product } from 'src/products/entity/products.entity';
import { UserIdDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/entity/user.entity';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class RentDto extends Rent {
  @ApiProperty({ type: [Product] })
  products: Product[];

  @ApiProperty({ type: User })
  user: User;
}

export type RentId = RentDto['id'];

export class CreateRentDto extends OmitType(RentDto, [
  'id',
  'products',
  'user',
  'total_price',
] as const) {
  @ApiProperty({ example: [1, 2, 3] })
  @IsArray()
  products: number[];

  @ApiProperty({ type: UserIdDto })
  @ValidateNested()
  @Type(() => UserIdDto)
  user: UserIdDto;
}

export class UpdateRentDto extends PartialType(CreateRentDto) {}

export class RentsByUserDto extends OmitType(RentDto, ['user'] as const) {}
