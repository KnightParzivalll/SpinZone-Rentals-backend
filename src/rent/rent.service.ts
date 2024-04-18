import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatasourceService } from 'src/datasource/datasource.service';
import { Rent } from './entities/rent.entity';
import { CreateRentDto, UpdateRentDto } from './entities/rent.dto';

@Injectable()
export class RentService {
  constructor(private readonly datasourceService: DatasourceService) {}

  create(rent: CreateRentDto): Rent {
    const rents = this.datasourceService.getRents();

    const newId =
      rents.length > 0 ? Math.max(...rents.map((f) => f.id)) + 1 : 1;

    const newRent = { id: newId, ...rent };
    rents.push(newRent);

    return newRent;
  }

  findAll(): Rent[] {
    const rents = this.datasourceService.getRents();

    if (rents.length === 0) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }

    return rents;
  }

  findOne(id: number) {
    const rent = this.datasourceService
      .getRents()
      .find((rent) => rent.id === id);

    if (!rent) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }

    return rent;
  }

  update(id: number, updatedRentDto: UpdateRentDto): Rent {
    const index = this.datasourceService
      .getRents()
      .findIndex((rent) => rent.id === id);

    if (index === -1) {
      throw new HttpException('No rent found', HttpStatus.BAD_REQUEST);
    }

    const rent = this.datasourceService.getRents()[index];

    rent.first_name = updatedRentDto.first_name
      ? updatedRentDto.first_name
      : rent.first_name;

    rent.last_name = updatedRentDto.last_name
      ? updatedRentDto.last_name
      : rent.last_name;

    rent.date = updatedRentDto.date ? updatedRentDto.date : rent.date;

    rent.time = updatedRentDto.time ? updatedRentDto.time : rent.time;

    this.datasourceService.getRents()[index] = rent;

    return rent;
  }

  remove(id: number) {
    const index = this.datasourceService
      .getRents()
      .findIndex((rent) => rent.id === id);

    if (index === -1) {
      throw new HttpException('No rent found', HttpStatus.BAD_REQUEST);
    }

    this.datasourceService.getRents().splice(index, 1);

    throw new HttpException('Successfully deleted', HttpStatus.OK);
  }
}
