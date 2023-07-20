import { Module } from '@nestjs/common';
import { QuizizzExamAnswerController } from './quizizz-exam-answer.controller';
import { QuizizzExamAnswerService } from './quizizz-exam-answer.service';

@Module({
  controllers: [QuizizzExamAnswerController],
  providers: [QuizizzExamAnswerService]
})
export class QuizizzExamAnswerModule {}
