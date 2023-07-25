import { ObjectId } from 'mongoose';
import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { QuizizzExamQuestion } from './schema/quizizz-exam-question.schema';
import { QuizizzExamQuestionService } from './quizizz-exam-question.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Quizizz Exam Question')
@Controller('api/quizizz-exam-question')
export class QuizizzExamQuestionController {
  constructor(
    private readonly quizizzExamQuestionService: QuizizzExamQuestionService,
  ) {}

  @Get('lists')
  async findAll(
    @Query('_page') _page: number = 1,
    @Query('_limit') _limit: number = 10,
    @Query('q') q: string = '',
  ): Promise<QuizizzExamQuestion[]> {
    return await this.quizizzExamQuestionService.findAll(_page, _limit, q);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: ObjectId): Promise<{ message: string }> {
    return await this.quizizzExamQuestionService.delete(id);
  }
}
