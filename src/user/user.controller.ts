import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto, UserId, UserDto } from './dto/user.dto';
import { NotFoundError } from 'src/common/decorator/error';
import { OKResponse } from 'src/common/dto/error.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({ status: 200, type: [UserDto] })
  findAll(): Promise<UserDto[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: UserDto })
  @NotFoundError()
  findOne(@Param('id') id: UserId): Promise<UserDto> {
    return this.userService.findOne(+id);
  }

  @Post()
  @ApiCreatedResponse({ type: UserDto })
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  @ApiResponse({ status: 200, type: UserDto })
  @ApiBody({ type: UpdateUserDto })
  @NotFoundError()
  update(
    @Param('id') id: UserId,
    @Body() updatedUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    return this.userService.update(+id, updatedUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: OKResponse })
  @NotFoundError()
  remove(@Param('id') id: UserId) {
    return this.userService.remove(+id);
  }
}
