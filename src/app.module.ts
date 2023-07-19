import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizizzQuesstionTypeController } from './quizizz-quesstion-type/quizizz-quesstion-type.controller';
import { QuizizzQuesstionTypeModule } from './quizizz-quesstion-type/quizizz-quesstion-type.module';
import { QuizizzQuestionGroupModule } from './quizizz-question-group/quizizz-question-group.module';
import { UserModule } from './user/user.module';
import { QuizizzQuestionModule } from './quizizz-question/quizizz-question.module';
import { QuizizzAnswerModule } from './quizizz-answer/quizizz-answer.module';
import { QuizizzQuestionLevelModule } from './quizizz-question-level/quizizz-question-level.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UserModule,
    QuizizzQuestionGroupModule,
    QuizizzQuesstionTypeModule,
    QuizizzQuestionModule,
    QuizizzAnswerModule,
    QuizizzQuestionLevelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
