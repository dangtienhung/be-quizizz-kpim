import { ApiTags } from '@nestjs/swagger';
import { Controller, Body, Param, Post, Get } from '@nestjs/common';
import { QuizizzAnswerService } from './quizizz-answer.service';
import { CreateQuizizzAnswerDto } from './dto/create.dto';
import { QuizizzAnswer } from './schema/quizizz-answer.schema';

@ApiTags('Quizizz Answer')
@Controller('api/quizizz-answer')
export class QuizizzAnswerController {
  constructor(private readonly quizizzAnswerService: QuizizzAnswerService) {}

  /* create */
  @Post()
  async create(@Body() body: CreateQuizizzAnswerDto): Promise<QuizizzAnswer> {
    return await this.quizizzAnswerService.create(body);
  }

  /* get detail */
  @Get('lists')
  async getList(
    @Param('_page') _page: number = 1,
    @Param('_limit') _limit: number = 10,
    @Param('q') q: string = '',
  ): Promise<QuizizzAnswer[]> {
    return await this.quizizzAnswerService.getList(_page, _limit, q);
  }

  /* get list */
  // @Get()
}
