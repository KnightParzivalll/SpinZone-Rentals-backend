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
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('rent_products')
@Controller('rent_products')
export class RentProductsController {
  constructor(private readonly rentProductsService: RentProductsService) {}

  @Get()
  @ApiResponse({ status: 200, type: [RentProduct] })
  findAll() {
    return this.rentProductsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: RentProduct })
  findOne(@Param('id') id: number) {
    return this.rentProductsService.findOne(+id);
  }

  @Put(':id')
  @ApiResponse({ status: 200, type: RentProduct })
  update(@Param('id') id: number, @Body() updatedRentProduct: RentProduct) {
    return this.rentProductsService.update(+id, updatedRentProduct);
  }

  @Post()
  @ApiResponse({ status: 200, type: RentProduct })
  create(@Body() createRentProduct: RentProduct) {
    return this.rentProductsService.create(createRentProduct);
  }

  @Delete(':id')
  @ApiOkResponse()
  remove(@Param('id') id: number) {
    return this.rentProductsService.remove(+id);
  }
}
