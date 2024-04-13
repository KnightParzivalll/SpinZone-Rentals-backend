import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { DatasourceModule } from './datasource/datasource.module';
import { RentProductsModule } from './rentProducts/rentProducts.module';
import { FeedbackModule } from './feedback/feedback.module';
import { RentModule } from './rent/rent.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [
    RentProductsModule,
    FeedbackModule,
    RentModule,
    ImagesModule,
    DatasourceModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe, // Включаем глобальную валидацию
    },
  ],
})
export class AppModule {}
