import {
  QuizizzExam,
  QuizizzExamSchema,
} from 'src/quizizz-exam/schema/quizizz-exam.schema';
import {
  QuizizzExamQuestion,
  QuizizzExamQuestionSchema,
} from './schema/quizizz-exam-question.schema';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizizzExamQuestionController } from './quizizz-exam-question.controller';
import { QuizizzExamQuestionService } from './quizizz-exam-question.service';

@Module({
  controllers: [QuizizzExamQuestionController],
  providers: [QuizizzExamQuestionService],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: QuizizzExamQuestion.name,
        useFactory: () => {
          const schema = QuizizzExamQuestionSchema;
          schema.plugin(require('mongoose-paginate-v2'));
          return schema;
        },
      },
      {
        name: QuizizzExam.name,
        useFactory: () => {
          const schema = QuizizzExamSchema;
          schema.plugin(require('mongoose-paginate-v2'));
          return schema;
        },
      },
    ]),
  ],
})
export class QuizizzExamQuestionModule {}
