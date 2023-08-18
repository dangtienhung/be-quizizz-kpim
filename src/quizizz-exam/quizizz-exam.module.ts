import {
  QuizActivity,
  QuizActivitySchema,
} from 'src/quiz-activity/schemas/quiz-activity.schemas';
import { QuizizzExam, QuizizzExamSchema } from './schema/quizizz-exam.schema';
import {
  QuizizzExamAnswer,
  QuizizzExamAnswerSchema,
} from 'src/quizizz-exam-answer/schema/quizizz-exam-answer.schema';
import {
  QuizizzExamQuestion,
  QuizizzExamQuestionSchema,
} from 'src/quizizz-exam-question/schema/quizizz-exam-question.schema';
import { User, UserSchema } from 'src/user/schema/user.schema';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizActivityService } from 'src/quiz-activity/quiz-activity.service';
import { QuizizzAnswerModule } from 'src/quizizz-answer/quizizz-answer.module';
import { QuizizzExamAnswerService } from 'src/quizizz-exam-answer/quizizz-exam-answer.service';
import { QuizizzExamController } from './quizizz-exam.controller';
import { QuizizzExamService } from './quizizz-exam.service';
import { QuizizzGateway } from '../gatewaies/quizizz.gateway';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [QuizizzExamController],
  providers: [
    QuizizzExamService,
    QuizizzGateway,
    QuizizzExamAnswerService,
    UserService,
    QuizActivityService,
  ],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: QuizizzExam.name,
        useFactory: () => {
          const schema = QuizizzExamSchema;
          schema.plugin(require('mongoose-paginate-v2'));
          return schema;
        },
      },
      {
        name: QuizizzExamQuestion.name,
        useFactory: () => {
          const schema = QuizizzExamQuestionSchema;
          schema.plugin(require('mongoose-paginate-v2'));
          return schema;
        },
      },
      {
        name: QuizizzExamAnswer.name,
        useFactory: () => {
          const schema = QuizizzExamAnswerSchema;
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
      {
        name: QuizActivity.name,
        useFactory: () => {
          const schema = QuizActivitySchema;
          schema.plugin(require('mongoose-paginate-v2'));
          return schema;
        },
      },
    ]),
    QuizizzAnswerModule,
  ],
})
export class QuizizzExamModule {}
