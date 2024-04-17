import { HttpStatus, Injectable } from '@nestjs/common';
import { RentProduct } from './entities/rentProducts.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateRentProductDto,
  GetRentProductDto,
} from './entities/rentProducts.dto';

@Injectable()
export class RentProductsService {
  constructor(
    @InjectRepository(RentProduct)
    private readonly rentProductRepository: Repository<RentProduct>,
  ) {}

  prepare_prices(rentProducts: RentProduct[]) {
    const rentProductsDto: GetRentProductDto[] = rentProducts.map(
      (rentProduct) => ({
        ...rentProduct,
        prices: [
          rentProduct.price_30min,
          rentProduct.price_1h,
          rentProduct.price_2h,
        ],
      }),
    );

    return rentProductsDto;
  }

  prepare_price(rentProduct: RentProduct) {
    const rentProductsDto: GetRentProductDto = {
      ...rentProduct,
      prices: [
        rentProduct.price_30min,
        rentProduct.price_1h,
        rentProduct.price_2h,
      ],
    };

    return rentProductsDto;
  }

  async create(
    rentProductDto: CreateRentProductDto,
  ): Promise<GetRentProductDto> {
    const rentProduct = this.rentProductRepository.create();

    rentProduct.name = rentProductDto.name;
    rentProduct.description = rentProductDto.description;
    rentProduct.image = rentProductDto.image;
    rentProduct.price_30min = rentProductDto.price_30min;
    rentProduct.price_1h = rentProductDto.price_1h;
    rentProduct.price_2h = rentProductDto.price_2h;

    await this.rentProductRepository.save(rentProduct);

    return this.prepare_price(rentProduct);
  }

  async findAll(): Promise<GetRentProductDto[]> {
    const rentProducts = await this.rentProductRepository.find();

    return this.prepare_prices(rentProducts);
  }

  async findOne(id: number): Promise<GetRentProductDto> {
    const rentProduct = await this.rentProductRepository.findOne({
      where: { id },
    });

    return this.prepare_price(rentProduct);
  }

  async update(
    id: number,
    rentProductDto: CreateRentProductDto,
  ): Promise<GetRentProductDto> {
    const rentProduct = await this.rentProductRepository.findOne({
      where: { id },
    });

    rentProduct.name = rentProductDto.name;
    rentProduct.description = rentProductDto.description;
    rentProduct.image = rentProductDto.image;
    rentProduct.price_30min = rentProductDto.price_30min;
    rentProduct.price_1h = rentProductDto.price_1h;
    rentProduct.price_2h = rentProductDto.price_2h;

    await this.rentProductRepository.save(rentProduct);

    return this.prepare_price(rentProduct);
  }

  async remove(id: number) {
    await this.rentProductRepository.delete({ id });
    return HttpStatus.OK;
  }
}
