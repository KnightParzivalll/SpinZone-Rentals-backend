import { Module } from '@nestjs/common';
import { DatasourceModule } from './datasource/datasource.module';
import { RentProductsModule } from './rentProducts/rentProducts.module';
import { FeedbackModule } from './feedback/feedback.module';
import { RentModule } from './rent/rent.module';

@Module({
  imports: [RentProductsModule, FeedbackModule, RentModule, DatasourceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
