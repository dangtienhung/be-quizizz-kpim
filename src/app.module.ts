import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizizzAnswerModule } from './quizizz-answer/quizizz-answer.module';
import { QuizizzExamAnswerModule } from './quizizz-exam-answer/quizizz-exam-answer.module';
import { QuizizzExamAnswerSchema } from './quizizz-exam-answer/schema/quizizz-exam-answer.schema';
import { QuizizzExamModule } from './quizizz-exam/quizizz-exam.module';
import { QuizizzExamQuestionModule } from './quizizz-exam-question/quizizz-exam-question.module';
import { QuizizzGateway } from './quizizz-exam/quizizz.gateway';
import { QuizizzModule } from './quizizz/quizizz.module';
import { QuizizzQuesstionTypeController } from './quizizz-quesstion-type/quizizz-quesstion-type.controller';
import { QuizizzQuesstionTypeModule } from './quizizz-quesstion-type/quizizz-quesstion-type.module';
import { QuizizzQuestionGroupModule } from './quizizz-question-group/quizizz-question-group.module';
import { QuizizzQuestionLevelModule } from './quizizz-question-level/quizizz-question-level.module';
import { QuizizzQuestionModule } from './quizizz-question/quizizz-question.module';
import { UserModule } from './user/user.module';

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
    QuizizzModule,
    QuizizzExamModule,
    QuizizzExamQuestionModule,
    QuizizzExamAnswerModule,
    CloudinaryModule,
    QuizizzGateway,
    MongooseModule.forFeature([
      { name: 'QuizizzExamAnswer', schema: QuizizzExamAnswerSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, QuizizzGateway],
})
export class AppModule {}
