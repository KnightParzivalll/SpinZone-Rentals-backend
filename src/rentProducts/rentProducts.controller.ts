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
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateRentProductDto,
  UpdateRentProductDto,
} from './entities/rentProducts.dto';
import { BadRequestResponse, OKResponse } from 'src/entities/global.entity';

@ApiTags('rent_products')
@Controller('rent_products')
export class RentProductsController {
  constructor(private readonly rentProductsService: RentProductsService) {}

  @Get()
  @ApiResponse({ status: 200, type: [RentProduct] })
  @ApiNoContentResponse({ description: 'No rent products found' })
  findAll() {
    return this.rentProductsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: RentProduct })
  @ApiNoContentResponse({ description: 'No rent product found' })
  findOne(@Param('id') id: number) {
    return this.rentProductsService.findOne(+id);
  }

  @Put(':id')
  @ApiResponse({ status: 200, type: RentProduct })
  @ApiBody({ type: UpdateRentProductDto })
  @ApiNoContentResponse({ description: 'No rent product found' })
  update(
    @Param('id') id: number,
    @Body() updatedRentProductDto: UpdateRentProductDto,
  ) {
    return this.rentProductsService.update(+id, updatedRentProductDto);
  }

  @Post()
  @ApiResponse({ status: 200, type: RentProduct })
  @ApiBody({ type: CreateRentProductDto })
  create(@Body() createRentProductDto: CreateRentProductDto) {
    return this.rentProductsService.create(createRentProductDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: OKResponse })
  @ApiBadRequestResponse({ type: BadRequestResponse })
  remove(@Param('id') id: number) {
    return this.rentProductsService.remove(+id);
  }
}
