import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Feedback } from './entity/feedback.entity';
import { CreateFeedbackDto, FeedbackDto, FeedbackId } from './dto/feedback.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { UserId } from 'src/user/dto/user.dto';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(feedbackDto: CreateFeedbackDto): Promise<FeedbackDto> {
    const user = await this.userRepository.findOne({
      where: { id: feedbackDto.user.id },
    });

    if (!user) {
      throw new NotFoundException(
        `User with id - ${feedbackDto.user.id} not found. Please ensure the user ID is correct and try again`,
      );
    }

    const feedback = this.feedbackRepository.create({
      ...feedbackDto,
      user: user,
    });

    await this.feedbackRepository.save(feedback);
    return feedback;
  }

  async findAll(): Promise<FeedbackDto[]> {
    return await this.feedbackRepository.find({ relations: ['user'] });
  }

  async findOne(id: FeedbackId): Promise<FeedbackDto> {
    const feedback = await this.feedbackRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!feedback) {
      throw new NotFoundException(
        `Feedback with id - ${id} not found. Please ensure the ID is correct and try again`,
      );
    }

    return feedback;
  }

  async remove(id: FeedbackId) {
    const feedback = await this.feedbackRepository.findOne({
      where: { id },
    });

    if (!feedback) {
      throw new NotFoundException(
        `Feedback with id - ${id} not found. Please ensure the feedback ID is correct and try again.`,
      );
    }

    await this.feedbackRepository.remove(feedback);

    throw new HttpException('Successfully deleted', HttpStatus.OK);
  }

  async findFeedbacksByUserId(userId: UserId): Promise<FeedbackDto[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(
        `User with id - ${userId} not found. Please ensure the user ID is correct and try again`,
      );
    }

    const feedbacks = await this.feedbackRepository.find({
      where: { user: user },
    });

    return feedbacks;
  }
}
