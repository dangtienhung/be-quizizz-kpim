import { Module } from '@nestjs/common';
import { QuizizzExamController } from './quizizz-exam.controller';
import { QuizizzExamService } from './quizizz-exam.service';

@Module({
  controllers: [QuizizzExamController],
  providers: [QuizizzExamService]
})
export class QuizizzExamModule {}
