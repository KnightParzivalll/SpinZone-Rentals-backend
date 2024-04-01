import { HttpStatus, Injectable } from '@nestjs/common';
import { DatasourceService } from 'src/datasource/datasource.service';
import { RentProduct } from './entities/rentProducts.entity';

@Injectable()
export class RentProductsService {
  constructor(private readonly datasourceService: DatasourceService) {}

  create(rentProduct: RentProduct) {
    this.datasourceService.getRentProducts().push(rentProduct);
    return rentProduct;
  }

  findAll(): RentProduct[] {
    return this.datasourceService.getRentProducts();
  }

  findOne(id: number) {
    return this.datasourceService
      .getRentProducts()
      .find((rentProduct) => rentProduct.id === id);
  }

  update(id: number, updatedRentProducts: RentProduct) {
    const index = this.datasourceService
      .getRentProducts()
      .findIndex((rentProduct) => rentProduct.id === id);
    this.datasourceService.getRentProducts()[index] = updatedRentProducts;
    return this.datasourceService.getRentProducts()[index];
  }

  remove(id: number) {
    const index = this.datasourceService
      .getRentProducts()
      .findIndex((rentProduct) => rentProduct.id === id);
    this.datasourceService.getRentProducts().splice(index, 1);
    return HttpStatus.OK;
  }
}
