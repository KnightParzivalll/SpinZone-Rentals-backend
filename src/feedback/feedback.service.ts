import { HttpStatus, Injectable } from '@nestjs/common';
import { DatasourceService } from 'src/datasource/datasource.service';
import { Feedback } from './entities/feedback.entity';

@Injectable()
export class FeedbackService {
  constructor(private readonly datasourceService: DatasourceService) {}

  create(feedback: Feedback) {
    this.datasourceService.getFeedbacks().push(feedback);
    return feedback;
  }

  findAll(): Feedback[] {
    return this.datasourceService.getFeedbacks();
  }

  findOne(id: number) {
    return this.datasourceService
      .getFeedbacks()
      .find((feedback) => feedback.id === id);
  }

  remove(id: number) {
    const index = this.datasourceService
      .getFeedbacks()
      .findIndex((feedback) => feedback.id === id);
    this.datasourceService.getFeedbacks().splice(index, 1);
    return HttpStatus.OK;
  }
}
