import {
  QuizizzExamAnswer,
  QuizizzExamAnswerSchema,
} from './schema/quizizz-exam-answer.schema';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizizzExamAnswerController } from './quizizz-exam-answer.controller';
import { QuizizzExamAnswerService } from './quizizz-exam-answer.service';

@Module({
  controllers: [QuizizzExamAnswerController],
  providers: [QuizizzExamAnswerService],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: QuizizzExamAnswer.name,
        useFactory: () => {
          const schema = QuizizzExamAnswerSchema;
          schema.plugin(require('mongoose-paginate-v2'));
          return schema;
        },
      },
    ]),
  ],
})
export class QuizizzExamAnswerModule {}
