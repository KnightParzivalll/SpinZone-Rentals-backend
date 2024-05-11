import { Module } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { Feedback } from './entity/feedback.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Feedback, User])],
  controllers: [FeedbackController],
  providers: [FeedbackService],
})
export class FeedbackModule {}
