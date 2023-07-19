import {
  QuestionType,
  QuestionTypeSchema,
} from './../quizizz-quesstion-type/schema/question-type.schema';
import {
  QuizizzAnswer,
  QuizizzAnswerSchema,
} from 'src/quizizz-answer/schema/quizizz-answer.schema';
import {
  QuizizzQuestion,
  QuizizzQuestionSchema,
} from './schema/quizizz-question.schema';
import {
  QuizizzQuestionGroup,
  QuizizzQuestionGroupSchema,
} from 'src/quizizz-question-group/schema/quizizz-question-group.schema';
import {
  QuizizzQuestionLevel,
  QuizizzQuestionLevelSchema,
} from 'src/quizizz-question-level/schema/quizizz-question-level.schema';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizizzQuestionController } from './quizizz-question.controller';
import { QuizizzQuestionService } from './quizizz-question.service';

const schemas = [
  { name: QuizizzQuestion.name, schema: QuizizzQuestionSchema },
  { name: QuizizzAnswer.name, schema: QuizizzAnswerSchema },
  { name: QuestionType.name, schema: QuestionTypeSchema },
  { name: QuizizzQuestionLevel.name, schema: QuizizzQuestionLevelSchema },
  { name: QuizizzQuestionGroup.name, schema: QuizizzQuestionGroupSchema },
];

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
      {
        name: QuestionType.name,
        useFactory: () => {
          const schema = QuestionTypeSchema;
          schema.plugin(require('mongoose-paginate-v2'));
          return schema;
        },
      },
      {
        name: QuizizzAnswer.name,
        useFactory: () => {
          const schema = QuizizzAnswerSchema;
          schema.plugin(require('mongoose-paginate-v2'));
          return schema;
        },
      },
      {
        name: QuizizzQuestionLevel.name,
        useFactory: () => {
          const schema = QuizizzQuestionLevelSchema;
          schema.plugin(require('mongoose-paginate-v2'));
          return schema;
        },
      },
      {
        name: QuizizzQuestionGroup.name,
        useFactory: () => {
          const schema = QuizizzQuestionGroupSchema;
          schema.plugin(require('mongoose-paginate-v2'));
          return schema;
        },
      },
    ]),
  ],
})
export class QuizizzQuestionModule {}
