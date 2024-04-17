import { HttpStatus, Injectable } from '@nestjs/common';
import { Rent } from './entities/rent.entity';
import { CreateRentDto } from './entities/rent.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RentService {
  constructor(
    @InjectRepository(Rent)
    private readonly rentRepository: Repository<Rent>,
  ) {}

  async create(rentDto: CreateRentDto): Promise<Rent> {
    const rent = this.rentRepository.create();

    rent.first_name = rentDto.first_name;
    rent.last_name = rentDto.last_name;
    rent.date = rentDto.date;
    rent.time = rentDto.time;

    await this.rentRepository.save(rent);
    return rent;
  }

  async findAll(): Promise<Rent[]> {
    const rents = await this.rentRepository.find();
    return rents;
  }

  async findOne(id: number): Promise<Rent> {
    return await this.rentRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, rentDto: CreateRentDto): Promise<Rent> {
    const rent = await this.rentRepository.findOne({ where: { id } });

    rent.first_name = rentDto.first_name;
    rent.last_name = rentDto.last_name;
    rent.date = rentDto.date;
    rent.time = rentDto.time;

    await this.rentRepository.save(rent);
    return rent;
  }

  async remove(id: number) {
    await this.rentRepository.delete({ id });
    return HttpStatus.OK;
  }
}
