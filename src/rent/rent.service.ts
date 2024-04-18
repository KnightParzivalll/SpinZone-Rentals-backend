import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Rent } from './entities/rent.entity';
import { CreateRentDto, UpdateRentDto } from './entities/rent.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestResponse, OKResponse } from 'src/entities/global.entity';

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

    if (rents.length === 0) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }

    return rents;
  }

  async findOne(id: number): Promise<Rent> {
    const rent = await this.rentRepository.findOne({
      where: { id },
    });

    if (!rent) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }

    return rent;
  }

  async update(id: number, rentDto: UpdateRentDto): Promise<Rent> {
    const rent = await this.rentRepository.findOne({ where: { id } });

    if (!rent) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }

    rent.first_name = rentDto.first_name ? rentDto.first_name : rent.first_name;
    rent.last_name = rentDto.last_name ? rentDto.last_name : rent.last_name;
    rent.date = rentDto.date ? rentDto.date : rent.date;
    rent.time = rentDto.time ? rentDto.time : rent.time;

    await this.rentRepository.save(rent);
    return rent;
  }

  async remove(id: number): Promise<BadRequestResponse | OKResponse> {
    const rent = await this.rentRepository.findOne({
      where: { id },
    });

    if (!rent) {
      throw new HttpException('No rent found', HttpStatus.BAD_REQUEST);
    }

    await this.rentRepository.remove(rent);

    throw new HttpException('Successfully deleted', HttpStatus.OK);
  }
}
