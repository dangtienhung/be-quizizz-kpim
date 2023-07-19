import {
  QuizizzAnswer,
  QuizizzAnswerSchema,
} from './schema/quizizz-answer.schema';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizizzAnswerController } from './quizizz-answer.controller';
import { QuizizzAnswerService } from './quizizz-answer.service';

@Module({
  controllers: [QuizizzAnswerController],
  providers: [QuizizzAnswerService],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: QuizizzAnswer.name,
        useFactory: () => {
          const schema = QuizizzAnswerSchema;
          schema.plugin(require('mongoose-paginate-v2'));
          return schema;
        },
      },
    ]),
  ],
})
export class QuizizzAnswerModule {}
