import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ProductsModule } from './products/products.module';
import { FeedbackModule } from './feedback/feedback.module';
import { RentModule } from './rent/rent.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ProductsModule,
    FeedbackModule,
    RentModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_BASE,
      synchronize: true,
      autoLoadEntities: true,
    }),
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
