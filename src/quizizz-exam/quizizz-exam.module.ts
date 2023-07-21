import { QuizizzExam, QuizizzExamSchema } from './schema/quizizz-exam.schema';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizizzExamController } from './quizizz-exam.controller';
import { QuizizzExamService } from './quizizz-exam.service';

@Module({
  controllers: [QuizizzExamController],
  providers: [QuizizzExamService],
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
      // {
      //   name:
      // }
    ]),
  ],
})
export class QuizizzExamModule {}
