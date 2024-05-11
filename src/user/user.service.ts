import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto, UpdateUserDto, UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userDto: CreateUserDto): Promise<UserDto> {
    const user = this.userRepository.create(userDto);

    await this.userRepository.save(user);
    return user;
  }

  async findAll(): Promise<UserDto[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<UserDto> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(
        `User with id - ${id} not found. Please ensure the ID is correct and try again`,
      );
    }

    return user;
  }

  async update(id: number, userDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(
        `User with id - ${id} not found. Please ensure the ID is correct and try again`,
      );
    }

    return this.userRepository.save({
      ...user,
      ...userDto,
    });
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(
        `User with id - ${id} not found. Please ensure the feedback ID is correct and try again.`,
      );
    }

    await this.userRepository.remove(user);

    throw new HttpException('Successfully deleted', HttpStatus.OK);
  }
}
