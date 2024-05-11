import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Product } from '../entity/products.entity';

export class ProductDto extends Product {}

export class GetProductDto extends ProductDto {
  @ApiProperty({
    description: `Rent price 1h`,
    example: 200,
  })
  @IsNumber()
  price_1h: number;

  @ApiProperty({
    description: `Base rent price (for 30 min)`,
    example: 300,
  })
  @IsNumber()
  price_2h: number;
}

export class ProductIdDto extends PickType(ProductDto, ['id'] as const) {}

export type ProductId = ProductDto['id'];

export class CreateProductDto extends OmitType(ProductDto, ['id'] as const) {}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
