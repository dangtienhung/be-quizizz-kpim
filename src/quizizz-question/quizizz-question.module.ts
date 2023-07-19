import {
  QuizizzQuestion,
  QuizizzQuestionSchema,
} from './schema/quizizz-question.schema';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizizzQuestionController } from './quizizz-question.controller';
import { QuizizzQuestionService } from './quizizz-question.service';

@Module({
  controllers: [QuizizzQuestionController],
  providers: [QuizizzQuestionService],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: QuizizzQuestion.name,
        useFactory: () => {
          const schema = QuizizzQuestionSchema;
          schema.plugin(require('mongoose-paginate-v2'));
          return schema;
        },
      },
    ]),
  ],
})
export class QuizizzQuestionModule {}
