import { Module } from '@nestjs/common';
import { QuizizzExamQuestionController } from './quizizz-exam-question.controller';
import { QuizizzExamQuestionService } from './quizizz-exam-question.service';

@Module({
  controllers: [QuizizzExamQuestionController],
  providers: [QuizizzExamQuestionService]
})
export class QuizizzExamQuestionModule {}
