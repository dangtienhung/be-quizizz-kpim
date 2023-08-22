import {
  QuizActivity,
  QuizActivitySchema,
} from 'src/quiz-activity/schemas/quiz-activity.schemas';
import { Quizizz, QuizizzSchema } from 'src/quizizz/schema/quizizz.schema';
import {
  QuizizzExam,
  QuizizzExamSchema,
} from 'src/quizizz-exam/schema/quizizz-exam.schema';
import {
  QuizizzExamAnswer,
  QuizizzExamAnswerSchema,
} from 'src/quizizz-exam-answer/schema/quizizz-exam-answer.schema';
import {
  QuizizzExamQuestion,
  QuizizzExamQuestionSchema,
} from 'src/quizizz-exam-question/schema/quizizz-exam-question.schema';
import { User, UserSchema } from './../user/schema/user.schema';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizActivityModule } from 'src/quiz-activity/quiz-activity.module';
import { QuizActivityService } from 'src/quiz-activity/quiz-activity.service';
import { QuizizzAnswerModule } from 'src/quizizz-answer/quizizz-answer.module';
import { QuizizzExamAnswerService } from 'src/quizizz-exam-answer/quizizz-exam-answer.service';
import { QuizizzExamModule } from 'src/quizizz-exam/quizizz-exam.module';
import { QuizizzExamQuestionService } from 'src/quizizz-exam-question/quizizz-exam-question.service';
import { QuizizzExamService } from 'src/quizizz-exam/quizizz-exam.service';
import { QuizizzGateway } from './quizizz.gateway';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    QuizizzExamModule,
    MongooseModule.forFeatureAsync([
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
        name: Quizizz.name,
        useFactory: () => {
          const schema = QuizizzSchema;
          schema.plugin(require('mongoose-paginate-v2'));
          return schema;
        },
      },
    ]),
    QuizizzAnswerModule,
    QuizActivityModule,
  ],
  controllers: [],
  providers: [
    QuizizzGateway,
    QuizizzExamAnswerService,
    UserService,
    QuizActivityService,
    QuizizzExamService,
    QuizizzExamQuestionService,
  ],
})
export class GatewayModule {}
