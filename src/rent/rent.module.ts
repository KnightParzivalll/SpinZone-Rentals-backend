import { Module } from '@nestjs/common';
import { RentController } from './rent.controller';
import { RentService } from './rent.service';
import { Rent } from './entities/rent.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Rent])],
  controllers: [RentController],
  providers: [RentService],
})
export class RentModule {}
