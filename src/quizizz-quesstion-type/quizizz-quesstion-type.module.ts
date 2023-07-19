import {
  QuestionType,
  QuestionTypeSchema,
} from './schema/question-type.schema';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizizzQuesstionTypeController } from './quizizz-quesstion-type.controller';
import { QuizizzQuesstionTypeService } from './quizizz-quesstion-type.service';

@Module({
  controllers: [QuizizzQuesstionTypeController],
  providers: [QuizizzQuesstionTypeService],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: QuestionType.name,
        useFactory: () => {
          const schema = QuestionTypeSchema;
          schema.plugin(require('mongoose-paginate-v2'));
          return schema;
        },
      },
    ]),
  ],
})
export class QuizizzQuesstionTypeModule {}
