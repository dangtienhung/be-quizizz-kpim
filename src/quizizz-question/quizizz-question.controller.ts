import { CreateQuestionQuizizz } from './dto/create.dto';
import { Controller, Body, Post, Query, Get } from '@nestjs/common';
import { QuizizzQuestionService } from './quizizz-question.service';
import { QuizizzQuestion } from './schema/quizizz-question.schema';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Quizizz Question')
@Controller('api/quizizz-question')
export class QuizizzQuestionController {
  constructor(
    private readonly quizizzQuestionService: QuizizzQuestionService,
  ) {}

  /* thêm dữ liệu */
  @Post('create')
  async create(@Body() body: CreateQuestionQuizizz): Promise<QuizizzQuestion> {
    return await this.quizizzQuestionService.create(body);
  }

  @Get('lists')
  async getList(
    @Query('_page') _page: number = 1,
    @Query('_limit') _limit: number = 10,
    @Query('q') q: string = '',
  ): Promise<QuizizzQuestion[]> {
    return await this.quizizzQuestionService.getAll(_page, _limit, q);
  }
}
