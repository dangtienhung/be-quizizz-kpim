import {
  QuizizzExamAnswer,
  QuizizzExamAnswerSchema,
} from 'src/quizizz-exam-answer/schema/quizizz-exam-answer.schema';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizizzAnswerModule } from 'src/quizizz-answer/quizizz-answer.module';
import { QuizizzExamAnswerModule } from 'src/quizizz-exam-answer/quizizz-exam-answer.module';
import { QuizizzExamAnswerService } from 'src/quizizz-exam-answer/quizizz-exam-answer.service';
import { QuizizzExamModule } from 'src/quizizz-exam/quizizz-exam.module';
import { QuizizzGateway } from './quizizz.gateway';

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
    ]),
    QuizizzAnswerModule,
  ],
  controllers: [],
  providers: [QuizizzGateway, QuizizzExamAnswerService],
})
export class GatewayModule {}
