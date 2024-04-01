import { Module } from '@nestjs/common';
import { RentProductsController } from './rentProducts.controller';
import { RentProductsService } from './rentProducts.service';
import { DatasourceModule } from 'src/datasource/datasource.module';

@Module({
  imports: [DatasourceModule],
  controllers: [RentProductsController],
  providers: [RentProductsService],
})
export class RentProductsModule {}
