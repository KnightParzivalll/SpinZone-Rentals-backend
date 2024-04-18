import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatasourceService } from 'src/datasource/datasource.service';
import { RentProduct } from './entities/rentProducts.entity';
import { BadRequestResponse, OKResponse } from 'src/entities/global.entity';
import {
  CreateRentProductDto,
  UpdateRentProductDto,
} from './entities/rentProducts.dto';

@Injectable()
export class RentProductsService {
  constructor(private readonly datasourceService: DatasourceService) {}

  create(rentProductDto: CreateRentProductDto): RentProduct {
    const rentProducts = this.datasourceService.getRentProducts();

    const newId =
      rentProducts.length > 0
        ? Math.max(...rentProducts.map((f) => f.id)) + 1
        : 1;

    const newRentProducts = { id: newId, ...rentProductDto };
    rentProducts.push(newRentProducts);

    return newRentProducts;
  }

  findAll(): RentProduct[] {
    const rentProducts = this.datasourceService.getRentProducts();

    if (rentProducts.length === 0) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }

    return rentProducts;
  }

  findOne(id: number): RentProduct {
    const rentProduct = this.datasourceService
      .getRentProducts()
      .find((rentProduct) => rentProduct.id === id);

    if (!rentProduct) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }

    return rentProduct;
  }

  update(
    id: number,
    updatedRentProductsDto: UpdateRentProductDto,
  ): RentProduct | BadRequestResponse {
    const index = this.datasourceService
      .getRentProducts()
      .findIndex((rentProduct) => rentProduct.id === id);

    if (index === -1) {
      throw new HttpException('No rentProduct found', HttpStatus.BAD_REQUEST);
    }

    const rentProduct = this.datasourceService.getRentProducts()[index];

    rentProduct.name = updatedRentProductsDto.name
      ? updatedRentProductsDto.name
      : rentProduct.name;
    rentProduct.description = updatedRentProductsDto.description
      ? updatedRentProductsDto.description
      : rentProduct.description;
    rentProduct.image = updatedRentProductsDto.image
      ? updatedRentProductsDto.image
      : rentProduct.image;
    rentProduct.prices = updatedRentProductsDto.prices
      ? updatedRentProductsDto.prices
      : rentProduct.prices;

    this.datasourceService.getRentProducts()[index] = rentProduct;

    return this.datasourceService.getRentProducts()[index];
  }

  remove(id: number): BadRequestResponse | OKResponse {
    const index = this.datasourceService
      .getRentProducts()
      .findIndex((rentProduct) => rentProduct.id === id);

    if (index === -1) {
      throw new HttpException('No rentProduct found', HttpStatus.BAD_REQUEST);
    }

    this.datasourceService.getRentProducts().splice(index, 1);

    throw new HttpException('Successfully deleted', HttpStatus.OK);
  }
}
