import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from './entity/products.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateProductDto,
  GetProductDto,
  ProductDto,
  ProductId,
  UpdateProductDto,
} from './dto/products.dto';

export const _1H_coefficient = 1.9;
export const _2H_coefficient = _1H_coefficient * 1.7;

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async prepare_prices(productsDto: ProductDto[]): Promise<GetProductDto[]> {
    const getProductsDtoPromises = productsDto.map((productDto) =>
      this.prepare_price(productDto),
    );

    const getProductsDto: GetProductDto[] = await Promise.all(
      getProductsDtoPromises,
    );

    return getProductsDto;
  }

  async prepare_price(productDto: ProductDto): Promise<GetProductDto> {
    const price_30min = productDto['price_30min'];
    const price_1h = price_30min * _1H_coefficient;
    const price_2h = price_30min * _2H_coefficient;

    const getProductDto: GetProductDto = {
      ...productDto,
      price_1h,
      price_2h,
    };

    return getProductDto;
  }

  async create(productDto: CreateProductDto): Promise<GetProductDto> {
    const product = this.productRepository.create(productDto);

    await this.productRepository.save(product);

    return await this.prepare_price(product);
  }

  async findAll(): Promise<GetProductDto[]> {
    const products = await this.productRepository.find();

    return this.prepare_prices(products);
  }

  async findOne(id: ProductId): Promise<GetProductDto> {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(
        `Product with id - ${id} not found. Please ensure the ID is correct and try again`,
      );
    }

    return this.prepare_price(product);
  }

  async update(
    id: ProductId,
    productDto: UpdateProductDto,
  ): Promise<GetProductDto> {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(
        `Product with id - ${id} not found. Please ensure the ID is correct and try again`,
      );
    }

    const updated_product = await this.productRepository.save({
      ...product,
      ...productDto,
    });

    return this.prepare_price(updated_product);
  }

  async remove(id: ProductId) {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(
        `Product with id - ${id} not found. Please ensure the ID is correct and try again`,
      );
    }

    await this.productRepository.remove(product);

    throw new HttpException('Successfully deleted', HttpStatus.OK);
  }
}
