import { Module } from '@nestjs/common';
import { RentController } from './rent.controller';
import { RentService } from './rent.service';
import { DatasourceModule } from 'src/datasource/datasource.module';

@Module({
  imports: [DatasourceModule],
  controllers: [RentController],
  providers: [RentService],
})
export class RentModule {}
