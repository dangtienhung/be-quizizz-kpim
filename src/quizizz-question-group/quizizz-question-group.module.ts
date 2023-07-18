import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizizzQuestionGroupController } from './quizizz-question-group.controller';
import { QuizizzQuestionGroupSchema } from './schema/quizizz-question-group.schema';
import { QuizizzQuestionGroupService } from './quizizz-question-group.service';

@Module({
  controllers: [QuizizzQuestionGroupController],
  providers: [QuizizzQuestionGroupService],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'QuizizzQuestionGroup',
        useFactory: () => {
          const schema = QuizizzQuestionGroupSchema;
          schema.plugin(require('mongoose-paginate-v2'));
          return schema;
        },
      },
    ]),
  ],
})
export class QuizizzQuestionGroupModule {}
