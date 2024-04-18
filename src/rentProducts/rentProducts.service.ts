import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RentProduct } from './entities/rentProducts.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateRentProductDto,
  GetRentProductDto,
  UpdateRentProductDto,
} from './entities/rentProducts.dto';
import { BadRequestResponse, OKResponse } from 'src/entities/global.entity';

@Injectable()
export class RentProductsService {
  constructor(
    @InjectRepository(RentProduct)
    private readonly rentProductRepository: Repository<RentProduct>,
  ) {}

  prepare_prices(rentProducts: RentProduct[]) {
    const rentProductsDto: GetRentProductDto[] = rentProducts.map(
      ({ price_30min, price_1h, price_2h, ...rest }) => ({
        ...rest,
        prices: [price_30min, price_1h, price_2h],
      }),
    );

    return rentProductsDto;
  }

  prepare_price(rentProduct: RentProduct) {
    const { price_30min, price_1h, price_2h, ...rest } = rentProduct;

    const rentProductsDto: GetRentProductDto = {
      ...rest,
      prices: [price_30min, price_1h, price_2h],
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
    rentProduct.price_30min = rentProductDto.prices[0];
    rentProduct.price_1h = rentProductDto.prices[1];
    rentProduct.price_2h = rentProductDto.prices[2];

    await this.rentProductRepository.save(rentProduct);

    return this.prepare_price(rentProduct);
  }

  async findAll(): Promise<GetRentProductDto[]> {
    const rentProducts = await this.rentProductRepository.find();

    if (rentProducts.length === 0) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }

    return this.prepare_prices(rentProducts);
  }

  async findOne(id: number): Promise<GetRentProductDto> {
    const rentProduct = await this.rentProductRepository.findOne({
      where: { id },
    });

    if (!rentProduct) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }

    return this.prepare_price(rentProduct);
  }

  async update(
    id: number,
    rentProductDto: UpdateRentProductDto,
  ): Promise<GetRentProductDto> {
    const rentProduct = await this.rentProductRepository.findOne({
      where: { id },
    });

    if (!rentProduct) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }

    rentProduct.name = rentProductDto.name
      ? rentProductDto.name
      : rentProduct.name;

    rentProduct.description = rentProductDto.description
      ? rentProductDto.description
      : rentProduct.description;

    rentProduct.image = rentProductDto.image
      ? rentProductDto.image
      : rentProduct.image;

    rentProduct.price_30min = rentProductDto.prices[0]
      ? rentProductDto.prices[0]
      : rentProduct.price_30min;

    rentProduct.price_1h = rentProductDto.prices[1]
      ? rentProductDto.prices[1]
      : rentProduct.price_1h;

    rentProduct.price_2h = rentProductDto.prices[2]
      ? rentProductDto.prices[2]
      : rentProduct.price_2h;

    await this.rentProductRepository.save(rentProduct);

    return this.prepare_price(rentProduct);
  }

  async remove(id: number): Promise<BadRequestResponse | OKResponse> {
    const rentProduct = await this.rentProductRepository.findOne({
      where: { id },
    });

    if (!rentProduct) {
      throw new HttpException('No rentProduct found', HttpStatus.BAD_REQUEST);
    }

    await this.rentProductRepository.remove(rentProduct);

    throw new HttpException('Successfully deleted', HttpStatus.OK);
  }
}
