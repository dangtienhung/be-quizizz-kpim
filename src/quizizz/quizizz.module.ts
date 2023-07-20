import { Module } from '@nestjs/common';
import { QuizizzController } from './quizizz.controller';
import { QuizizzService } from './quizizz.service';

@Module({
  controllers: [QuizizzController],
  providers: [QuizizzService]
})
export class QuizizzModule {}
