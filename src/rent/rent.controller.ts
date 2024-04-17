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
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('rent')
@Controller('rent')
export class RentController {
  constructor(private readonly rentService: RentService) {}

  @Get()
  @ApiResponse({ status: 200, type: [Rent] })
  findAll() {
    return this.rentService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Rent })
  findOne(@Param('id') id: number) {
    return this.rentService.findOne(+id);
  }

  @Post()
  @ApiResponse({ status: 201, type: Rent })
  create(@Body() createRent: Rent) {
    return this.rentService.create(createRent);
  }

  @Put(':id')
  @ApiResponse({ status: 200, type: Rent })
  update(@Param('id') id: number, @Body() updatedRent: Rent) {
    return this.rentService.update(+id, updatedRent);
  }

  @Delete(':id')
  @ApiOkResponse()
  remove(@Param('id') id: number) {
    return this.rentService.remove(+id);
  }
}
