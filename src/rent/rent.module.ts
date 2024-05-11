import { Module } from '@nestjs/common';
import { RentController } from './rent.controller';
import { RentService } from './rent.service';
import { Rent } from './entity/rent.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entity/products.entity';
import { User } from 'src/user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rent, User, Product])],
  controllers: [RentController],
  providers: [RentService],
})
export class RentModule {}
