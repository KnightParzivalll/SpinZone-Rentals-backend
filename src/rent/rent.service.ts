import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateRentDto,
  RentDto,
  RentId,
  RentsByUserDto,
  UpdateRentDto,
} from './dto/rent.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Duration, Rent } from './entity/rent.entity';
import { User } from 'src/user/entity/user.entity';
import { Product } from 'src/products/entity/products.entity';
import { ProductDto } from 'src/products/dto/products.dto';
import {
  _1H_coefficient,
  _2H_coefficient,
} from 'src/products/products.service';
import { UserId } from 'src/user/dto/user.dto';

@Injectable()
export class RentService {
  constructor(
    @InjectRepository(Rent)
    private readonly rentRepository: Repository<Rent>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async calculate_price(
    products: ProductDto[],
    duration: Duration,
  ): Promise<number> {
    let totalPrice = 0;
    let price_coefficient = 1;

    if (duration == Duration._1h) {
      price_coefficient = _1H_coefficient;
    } else if (duration == Duration._2h) {
      price_coefficient = _2H_coefficient;
    }

    for (const product of products) {
      totalPrice += product.price_30min * price_coefficient;
    }

    return totalPrice;
  }

  async create(rentDto: CreateRentDto): Promise<RentDto> {
    const productIds = rentDto.products;

    const user = await this.userRepository.findOne({
      where: { id: rentDto.user.id },
    });

    if (!user) {
      throw new NotFoundException(
        `User with id - ${rentDto.user.id} not found. Please ensure the user ID is correct and try again`,
      );
    }

    const products = await this.productRepository.findBy({
      id: In(productIds),
    });

    if (products.length !== productIds.length) {
      throw new NotFoundException(
        `One or more products not found. Please ensure the product IDs are correct and try again.`,
      );
    }

    if (products.length === 0) {
      throw new NotFoundException(
        'Product(s) not found. Please ensure the product ID(s) are correct and try again',
      );
    }

    const total_price = await this.calculate_price(products, rentDto.duration);

    const rent = this.rentRepository.create({
      ...rentDto,
      user: user,
      products: products,
      total_price: total_price,
    });

    await this.rentRepository.save(rent);

    return rent;
  }

  async findAll(): Promise<RentDto[]> {
    return await this.rentRepository.find({
      relations: ['products', 'user'],
    });
  }

  async findOne(id: RentId): Promise<RentDto> {
    const rent = await this.rentRepository.findOne({
      where: { id },
      relations: ['products', 'user'],
    });

    if (!rent) {
      throw new NotFoundException(
        `Rent with id - ${id} not found. Please ensure the user ID is correct and try again`,
      );
    }

    return rent;
  }

  async update(id: RentId, rentDto: UpdateRentDto): Promise<RentDto> {
    const rent = await this.rentRepository.findOne({
      where: { id },
      relations: ['products', 'user'],
    });

    if (!rent) {
      throw new NotFoundException(
        `Rent with id - ${id} not found. Please ensure the ID is correct and try again`,
      );
    }

    if (rentDto.user) {
      const user = await this.userRepository.findOne({
        where: { id: rentDto.user.id },
      });

      if (!user) {
        throw new NotFoundException(
          `User with id - ${rentDto.user.id} not found. Please ensure the user ID is correct and try again`,
        );
      }

      rent.user = user;
    }

    if (rentDto.products) {
      const productIds = rentDto.products;

      const products = await this.productRepository.findBy({
        id: In(productIds),
      });

      if (products.length !== productIds.length) {
        throw new NotFoundException(
          `One or more products not found. Please ensure the product IDs are correct and try again.`,
        );
      }

      if (products.length === 0) {
        throw new NotFoundException(
          'Product(s) not found. Please ensure the product ID(s) are correct and try again',
        );
      }

      rent.products = products;
    }

    if (rentDto.duration) {
      rent.duration = rentDto.duration;
    }

    rent.total_price = await this.calculate_price(rent.products, rent.duration);

    return await this.rentRepository.save({
      ...rent,
      ...rentDto,
      user: rent.user,
      products: rent.products,
      total_price: rent.total_price,
    });
  }

  async remove(id: RentId) {
    const rent = await this.rentRepository.findOne({
      where: { id },
    });

    if (!rent) {
      throw new NotFoundException(
        `Rent with id - ${id} not found. Please ensure the user ID is correct and try again`,
      );
    }

    await this.rentRepository.remove(rent);

    throw new HttpException('Successfully deleted', HttpStatus.OK);
  }

  async findRentsByUserId(userId: UserId): Promise<RentsByUserDto[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(
        `User with id - ${userId} not found. Please ensure the user ID is correct and try again`,
      );
    }

    const rents = await this.rentRepository.find({
      where: { user: user },
      relations: ['products'],
    });

    return rents;
  }
}
