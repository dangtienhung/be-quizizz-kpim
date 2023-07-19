import {
  QuizizzQuestionLevel,
  QuizizzQuestionLevelSchema,
} from './schema/quizizz-question-level.schema';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizizzQuestionLevelController } from './quizizz-question-level.controller';
import { QuizizzQuestionLevelService } from './quizizz-question-level.service';

@Module({
  controllers: [QuizizzQuestionLevelController],
  providers: [QuizizzQuestionLevelService],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: QuizizzQuestionLevel.name,
        useFactory: () => {
          const schema = QuizizzQuestionLevelSchema;
          schema.plugin(require('mongoose-paginate-v2'));
          return schema;
        },
      },
    ]),
  ],
})
export class QuizizzQuestionLevelModule {}
