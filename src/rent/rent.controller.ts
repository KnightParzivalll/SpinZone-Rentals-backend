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
import { ApiBody, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotFoundError } from 'src/common/decorator/error';
import {
  RentDto,
  RentId,
  CreateRentDto,
  UpdateRentDto,
  RentsByUserDto,
} from './dto/rent.dto';
import { OKResponse } from 'src/common/dto/error.dto';
import { UserId } from 'src/user/dto/user.dto';

@ApiTags('rent')
@Controller('rent')
export class RentController {
  constructor(private readonly rentService: RentService) {}

  @Get()
  @ApiResponse({ status: 200, type: [RentDto] })
  findAll(): Promise<RentDto[]> {
    return this.rentService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: RentDto })
  @NotFoundError()
  findOne(@Param('id') id: RentId): Promise<RentDto> {
    return this.rentService.findOne(+id);
  }

  @Get('user/:userId')
  @ApiResponse({ status: 200, type: [RentsByUserDto] })
  @NotFoundError()
  findRentsByUserId(
    @Param('userId') userId: UserId,
  ): Promise<RentsByUserDto[]> {
    return this.rentService.findRentsByUserId(+userId);
  }

  @Post()
  @ApiResponse({ status: 201, type: RentDto })
  @ApiBody({ type: CreateRentDto })
  @NotFoundError()
  create(@Body() createRentDto: CreateRentDto): Promise<RentDto> {
    return this.rentService.create(createRentDto);
  }

  @Put(':id')
  @ApiResponse({ status: 200, type: RentDto })
  @ApiBody({ type: UpdateRentDto })
  @NotFoundError()
  update(
    @Param('id') id: RentId,
    @Body() updatedRentDto: UpdateRentDto,
  ): Promise<RentDto> {
    return this.rentService.update(+id, updatedRentDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: OKResponse })
  @NotFoundError()
  remove(@Param('id') id: RentId) {
    return this.rentService.remove(+id);
  }
}
