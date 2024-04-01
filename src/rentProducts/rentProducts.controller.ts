import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RentProductsService } from './rentProducts.service';
import { RentProduct } from './entities/rentProducts.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('rent_products')
@Controller('rent_products')
export class RentProductsController {
  constructor(private readonly rentProductsService: RentProductsService) {}

  @Get()
  findAll() {
    return this.rentProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.rentProductsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updatedRentProduct: RentProduct) {
    return this.rentProductsService.update(+id, updatedRentProduct);
  }

  @Post()
  create(@Body() createRentProduct: RentProduct) {
    return this.rentProductsService.create(createRentProduct);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.rentProductsService.remove(+id);
  }
}
