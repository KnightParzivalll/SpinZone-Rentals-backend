import { HttpStatus, Injectable } from '@nestjs/common';
import { DatasourceService } from 'src/datasource/datasource.service';
import { Feedback } from './entities/feedback.entity';
import { CreateFeedbackDto } from './entities/feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(private readonly datasourceService: DatasourceService) {}

  create(feedback: CreateFeedbackDto) {
    const feedbacks = this.datasourceService.getFeedbacks();

    const newId =
      feedbacks.length > 0 ? Math.max(...feedbacks.map((f) => f.id)) + 1 : 1;

    const newFeedback = { id: newId, ...feedback }; // Создаем новый отзыв с автоинкрементным идентификатором
    feedbacks.push(newFeedback);

    return newFeedback;
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
