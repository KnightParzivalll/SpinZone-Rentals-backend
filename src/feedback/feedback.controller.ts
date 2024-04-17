import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import {
  ApiBody,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiBadRequestResponse,
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
  @ApiCreatedResponse({ type: Feedback })
  @ApiBody({ type: CreateFeedbackDto })
  create(@Body() createFeedback: CreateFeedbackDto) {
    return this.feedbackService.create(createFeedback);
  }

  @Delete(':id')
  @ApiOkResponse({ type: OKResponse })
  @ApiBadRequestResponse({ type: BadRequestResponse })
  remove(@Param('id') id: number) {
    return this.feedbackService.remove(+id);
  }
}
