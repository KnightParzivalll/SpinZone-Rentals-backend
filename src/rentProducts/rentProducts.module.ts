import { Module } from '@nestjs/common';
import { RentProductsController } from './rentProducts.controller';
import { RentProductsService } from './rentProducts.service';
import { RentProduct } from './entities/rentProducts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RentProduct])],
  controllers: [RentProductsController],
  providers: [RentProductsService],
})
export class RentProductsModule {}
