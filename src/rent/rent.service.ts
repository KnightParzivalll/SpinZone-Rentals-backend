import { HttpStatus, Injectable } from '@nestjs/common';
import { DatasourceService } from 'src/datasource/datasource.service';
import { Rent } from './entities/rent.entity';

@Injectable()
export class RentService {
  constructor(private readonly datasourceService: DatasourceService) {}

  create(rent: Rent) {
    this.datasourceService.getRents().push(rent);
    return rent;
  }

  findAll(): Rent[] {
    return this.datasourceService.getRents();
  }

  findOne(id: number) {
    return this.datasourceService.getRents().find((rent) => rent.id === id);
  }

  update(id: number, updatedRent: Rent) {
    const index = this.datasourceService
      .getRents()
      .findIndex((rent) => rent.id === id);
    this.datasourceService.getRents()[index] = updatedRent;
    return this.datasourceService.getRents()[index];
  }

  remove(id: number) {
    const index = this.datasourceService
      .getRents()
      .findIndex((rent) => rent.id === id);
    this.datasourceService.getRents().splice(index, 1);
    return HttpStatus.OK;
  }
}
