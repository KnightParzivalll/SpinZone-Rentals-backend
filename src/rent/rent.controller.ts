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
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateRentDto, UpdateRentDto } from './entities/rent.dto';
import { BadRequestResponse, OKResponse } from 'src/entities/global.entity';

@ApiTags('rent')
@Controller('rent')
export class RentController {
  constructor(private readonly rentService: RentService) {}

  @Get()
  @ApiResponse({ status: 200, type: [Rent] })
  @ApiNoContentResponse({ description: 'No rents found' })
  findAll() {
    return this.rentService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Rent })
  @ApiNoContentResponse({ description: 'No rent found' })
  findOne(@Param('id') id: number) {
    return this.rentService.findOne(+id);
  }

  @Post()
  @ApiResponse({ status: 200, type: Rent })
  @ApiBody({ type: CreateRentDto })
  create(@Body() createRentDto: CreateRentDto) {
    return this.rentService.create(createRentDto);
  }

  @Put(':id')
  @ApiBody({ type: UpdateRentDto })
  @ApiNoContentResponse({ description: 'No rent found' })
  update(@Param('id') id: number, @Body() updatedRentDto: UpdateRentDto) {
    return this.rentService.update(+id, updatedRentDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiOkResponse({ type: OKResponse })
  @ApiBadRequestResponse({ type: BadRequestResponse })
  remove(@Param('id') id: number) {
    return this.rentService.remove(+id);
  }
}
