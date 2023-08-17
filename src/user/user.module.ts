import {
  QuestionType,
  QuestionTypeSchema,
} from 'src/quizizz-quesstion-type/schema/question-type.schema';
import {
  QuizizzQuestion,
  QuizizzQuestionSchema,
} from 'src/quizizz-question/schema/quizizz-question.schema';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserSchema } from './schema/user.schema';
import { UserService } from './user.service';
import mongosePaginate from 'mongoose-paginate-v2';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'User',
        useFactory: () => {
          const schema = UserSchema;
          schema.plugin(require('mongoose-paginate-v2'));
          return schema;
        },
      },
      // {
      //   name: QuestionType.name,
      //   useFactory: () => {
      //     const schema = QuestionTypeSchema;
      //     schema.plugin(require('mongoose-paginate-v2'));
      //     return schema;
      //   },
      // },
      // {
      //   name: QuizizzQuestion.name,
      //   useFactory: () => {
      //     const schema = QuizizzQuestionSchema;
      //     schema.plugin(require('mongoose-paginate-v2'));
      //     return schema;
      //   },
      // },
    ]),
  ],
})
export class UserModule {}
