import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { QuizizzExamAnswerService } from './quizizz-exam-answer.service';
import { CreateQuizizzExamAnswerDto } from './dto/create.dto';

@ApiTags('Quizizz Exam Answer')
@Controller('quizizz-exam-answer')
export class QuizizzExamAnswerController {
  constructor(
    private readonly quizizzExamAnswerService: QuizizzExamAnswerService,
  ) {}

  /* create data */
  @Post('submit-answer')
  async submitedAnswer(@Body() data: CreateQuizizzExamAnswerDto) {}
}
