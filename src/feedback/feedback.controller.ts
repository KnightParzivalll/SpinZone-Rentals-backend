import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import {
  ApiBody,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import {
  CreateFeedbackDto,
  FeedbackByUserDto,
  FeedbackDto,
  FeedbackId,
} from './dto/feedback.dto';
import { NotFoundError } from 'src/common/decorator/error';
import { OKResponse } from 'src/common/dto/error.dto';
import { UserId } from 'src/user/dto/user.dto';

@ApiTags('feedbacks')
@Controller('feedbacks')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get()
  @ApiResponse({ status: 200, type: [FeedbackDto] })
  findAll(): Promise<FeedbackDto[]> {
    return this.feedbackService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: FeedbackDto })
  @NotFoundError()
  findOne(@Param('id') id: FeedbackId): Promise<FeedbackDto> {
    return this.feedbackService.findOne(+id);
  }

  @Get('user/:userId')
  @ApiResponse({ status: 200, type: [FeedbackByUserDto] })
  @NotFoundError()
  findFeedbacksByUserId(
    @Param('userId') userId: UserId,
  ): Promise<FeedbackByUserDto[]> {
    return this.feedbackService.findFeedbacksByUserId(+userId);
  }

  @Post()
  @ApiCreatedResponse({ type: FeedbackDto })
  @ApiBody({ type: CreateFeedbackDto })
  @NotFoundError()
  create(@Body() createFeedbackDto: CreateFeedbackDto): Promise<FeedbackDto> {
    return this.feedbackService.create(createFeedbackDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: OKResponse })
  @NotFoundError()
  remove(@Param('id') id: FeedbackId) {
    return this.feedbackService.remove(+id);
  }
}
