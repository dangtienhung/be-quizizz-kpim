import {
  QuestionType,
  QuestionTypeSchema,
} from 'src/quizizz-quesstion-type/schema/question-type.schema';
import { Quizizz, QuizizzSchema } from './schema/quizizz.schema';
import {
  QuizizzQuestion,
  QuizizzQuestionSchema,
} from 'src/quizizz-question/schema/quizizz-question.schema';
import { User, UserSchema } from 'src/user/schema/user.schema';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizizzController } from './quizizz.controller';
import { QuizizzService } from './quizizz.service';

@Module({
  controllers: [QuizizzController],
  providers: [QuizizzService],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Quizizz.name,
        useFactory: () => {
          const schema = QuizizzSchema;
          schema.plugin(require('mongoose-paginate-v2'));
          return schema;
        },
      },
      {
        name: QuizizzQuestion.name,
        useFactory: () => {
          const schema = QuizizzQuestionSchema;
          schema.plugin(require('mongoose-paginate-v2'));
          return schema;
        },
      },
      {
        name: QuestionType.name,
        useFactory: () => {
          const schema = QuestionTypeSchema;
          schema.plugin(require('mongoose-paginate-v2'));
          return schema;
        },
      },
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.plugin(require('mongoose-paginate-v2'));
          return schema;
        },
      },
    ]),
  ],
})
export class QuizizzModule {}
