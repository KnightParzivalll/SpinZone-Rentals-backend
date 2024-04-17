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
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  GetRentProductDto,
  CreateRentProductDto,
} from './entities/rentProducts.dto';

@ApiTags('rent_products')
@Controller('rent_products')
export class RentProductsController {
  constructor(private readonly rentProductsService: RentProductsService) {}

  @Get()
  @ApiResponse({ status: 200, type: [GetRentProductDto] })
  findAll() {
    return this.rentProductsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: GetRentProductDto })
  findOne(@Param('id') id: number) {
    return this.rentProductsService.findOne(+id);
  }

  @Put(':id')
  @ApiResponse({ status: 201, type: GetRentProductDto })
  update(
    @Param('id') id: number,
    @Body() updatedRentProduct: CreateRentProductDto,
  ) {
    return this.rentProductsService.update(+id, updatedRentProduct);
  }

  @Post()
  @ApiResponse({ status: 201, type: GetRentProductDto })
  create(@Body() createRentProduct: CreateRentProductDto) {
    return this.rentProductsService.create(createRentProduct);
  }

  @Delete(':id')
  @ApiOkResponse()
  remove(@Param('id') id: number) {
    return this.rentProductsService.remove(+id);
  }
}
