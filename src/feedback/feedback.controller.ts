import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateFeedbackDto } from './entities/feedback.dto';

@ApiTags('feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get()
  findAll() {
    return this.feedbackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.feedbackService.findOne(+id);
  }

  @Post()
  create(@Body() createFeedback: CreateFeedbackDto) {
    return this.feedbackService.create(createFeedback);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.feedbackService.remove(+id);
  }
}
