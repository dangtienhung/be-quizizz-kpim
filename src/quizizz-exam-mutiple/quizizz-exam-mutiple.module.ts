import { Module } from '@nestjs/common';
import { QuizizzExamMutipleController } from './quizizz-exam-mutiple.controller';
import { QuizizzExamMutipleService } from './quizizz-exam-mutiple.service';

@Module({
  controllers: [QuizizzExamMutipleController],
  providers: [QuizizzExamMutipleService]
})
export class QuizizzExamMutipleModule {}
