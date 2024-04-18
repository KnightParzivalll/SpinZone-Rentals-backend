import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateFeedbackDto } from './entities/feedback.dto';
import { Feedback } from './entities/feedback.entity';
import { BadRequestResponse, OKResponse } from 'src/entities/global.entity';

@ApiTags('feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get()
  @ApiResponse({ status: 200, type: [Feedback] })
  @ApiNoContentResponse({ description: 'No feedbacks found' })
  findAll() {
    return this.feedbackService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Feedback })
  @ApiNoContentResponse({ description: 'No feedback found' })
  findOne(@Param('id') id: number) {
    return this.feedbackService.findOne(+id);
  }

  @Post()
  @ApiBody({ type: CreateFeedbackDto })
  @ApiResponse({ status: 200, type: Feedback })
  create(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackService.create(createFeedbackDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: OKResponse })
  @ApiBadRequestResponse({ type: BadRequestResponse })
  remove(@Param('id') id: number) {
    return this.feedbackService.remove(+id);
  }
}
