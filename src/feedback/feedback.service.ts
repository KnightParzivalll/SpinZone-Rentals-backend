import { HttpStatus, Injectable } from '@nestjs/common';
import { Feedback, Gender } from './entities/feedback.entity';
import { CreateFeedbackDto } from './entities/feedback.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
  ) {}

  async create(feedbackDto: CreateFeedbackDto): Promise<Feedback> {
    const feedback = this.feedbackRepository.create();

    feedback.first_name = feedbackDto.first_name;
    feedback.last_name = feedbackDto.last_name;
    feedback.text = feedbackDto.text;
    feedback.gender = feedbackDto.gender as Gender;

    await this.feedbackRepository.save(feedback);
    return feedback;
  }

  async findAll(): Promise<Feedback[]> {
    const feedbacks = await this.feedbackRepository.find();
    return feedbacks;
  }

  async findOne(id: number): Promise<Feedback> {
    return await this.feedbackRepository.findOne({
      where: { id },
    });
  }

  async remove(id: number) {
    await this.feedbackRepository.delete({ id });
    return HttpStatus.OK;
  }
}
