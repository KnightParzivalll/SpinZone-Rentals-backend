import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiBody, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  GetProductDto,
  ProductId,
  UpdateProductDto,
  CreateProductDto,
} from './dto/products.dto';
import { NotFoundError } from 'src/common/decorator/error';
import { OKResponse } from 'src/common/dto/error.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiResponse({ status: 200, type: [GetProductDto] })
  findAll(): Promise<GetProductDto[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: GetProductDto })
  @NotFoundError()
  findOne(@Param('id') id: ProductId): Promise<GetProductDto> {
    return this.productsService.findOne(+id);
  }

  @Put(':id')
  @ApiResponse({ status: 200, type: GetProductDto })
  @ApiBody({ type: UpdateProductDto })
  @NotFoundError()
  update(
    @Param('id') id: ProductId,
    @Body() updatedProductDto: UpdateProductDto,
  ): Promise<GetProductDto> {
    return this.productsService.update(+id, updatedProductDto);
  }

  @Post()
  @ApiResponse({ status: 201, type: GetProductDto })
  create(@Body() createProductDto: CreateProductDto): Promise<GetProductDto> {
    return this.productsService.create(createProductDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: OKResponse })
  @NotFoundError()
  remove(@Param('id') id: ProductId) {
    return this.productsService.remove(+id);
  }
}
