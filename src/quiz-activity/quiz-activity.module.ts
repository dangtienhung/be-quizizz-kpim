import {
  QuizActivity,
  QuizActivitySchema,
} from './schemas/quiz-activity.schemas';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizActivityController } from './quiz-activity.controller';
import { QuizActivityService } from './quiz-activity.service';

@Module({
  controllers: [QuizActivityController],
  providers: [QuizActivityService],
  imports: [
    MongooseModule.forFeature([
      { name: QuizActivity.name, schema: QuizActivitySchema },
    ]),
  ],
})
export class QuizActivityModule {}
