import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RentService } from './rent.service';
import { Rent } from './entities/rent.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('rent')
@Controller('rent')
export class RentController {
  constructor(private readonly rentService: RentService) {}

  @Get()
  findAll() {
    return this.rentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.rentService.findOne(+id);
  }

  @Post()
  create(@Body() createRent: Rent) {
    return this.rentService.create(createRent);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updatedRent: Rent) {
    return this.rentService.update(+id, updatedRent);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.rentService.remove(+id);
  }
}
