import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Feedback, Gender } from './entities/feedback.entity';
import { CreateFeedbackDto } from './entities/feedback.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OKResponse, BadRequestResponse } from 'src/entities/global.entity';

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

    if (feedbacks.length === 0) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }

    return feedbacks;
  }

  async findOne(id: number): Promise<Feedback> {
    const feedback = await this.feedbackRepository.findOne({
      where: { id },
    });

    if (!feedback) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }

    return feedback;
  }

  async remove(id: number): Promise<BadRequestResponse | OKResponse> {
    const feedback = await this.feedbackRepository.findOne({
      where: { id },
    });

    if (!feedback) {
      throw new HttpException('No feedback found', HttpStatus.BAD_REQUEST);
    }

    await this.feedbackRepository.remove(feedback);

    throw new HttpException('Successfully deleted', HttpStatus.OK);
  }
}
