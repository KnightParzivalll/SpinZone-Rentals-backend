import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatasourceService } from 'src/datasource/datasource.service';
import { Feedback } from './entities/feedback.entity';
import { CreateFeedbackDto } from './entities/feedback.dto';
import { BadRequestResponse, OKResponse } from 'src/entities/global.entity';

@Injectable()
export class FeedbackService {
  constructor(private readonly datasourceService: DatasourceService) {}

  create(feedback: CreateFeedbackDto): Feedback {
    const feedbacks = this.datasourceService.getFeedbacks();

    const newId =
      feedbacks.length > 0 ? Math.max(...feedbacks.map((f) => f.id)) + 1 : 1;

    const newFeedback = { id: newId, ...feedback };
    feedbacks.push(newFeedback);

    return newFeedback;
  }

  findAll(): Feedback[] {
    const feedbacks = this.datasourceService.getFeedbacks();

    if (feedbacks.length === 0) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }

    return feedbacks;
  }

  findOne(id: number): Feedback {
    const feedback = this.datasourceService
      .getFeedbacks()
      .find((feedback) => feedback.id === id);

    if (!feedback) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }

    return feedback;
  }

  remove(id: number): BadRequestResponse | OKResponse {
    const index = this.datasourceService
      .getFeedbacks()
      .findIndex((rentProduct) => rentProduct.id === id);

    if (index === -1) {
      throw new HttpException('No feedback found', HttpStatus.BAD_REQUEST);
    }

    this.datasourceService.getFeedbacks().splice(index, 1);

    throw new HttpException('Successfully deleted', HttpStatus.OK);
  }
}
