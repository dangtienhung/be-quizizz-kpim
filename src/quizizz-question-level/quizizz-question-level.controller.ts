import { Controller, Body, Post, Query, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QuizizzQuestionLevelService } from './quizizz-question-level.service';
import { CreateQuizizzLevelDto } from './dto/create.dto';
import { QuizizzQuestionLevel } from './schema/quizizz-question-level.schema';

@ApiTags('Quizizz Question Level')
@Controller('api/quizizz-question-level')
export class QuizizzQuestionLevelController {
  constructor(
    private readonly quizizzQuestionLevelService: QuizizzQuestionLevelService,
  ) {}

  /* create */
  @Post('/create')
  async create(
    @Body() body: CreateQuizizzLevelDto,
  ): Promise<QuizizzQuestionLevel> {
    return await this.quizizzQuestionLevelService.create(body);
  }

  /* lấy ra tất cả các danh sách */
  @Get('/lists')
  async getList(
    @Query('_page') _page: number = 1,
    @Query('_limit') _limit: number = 10,
    @Query('q') q: string = '',
  ): Promise<QuizizzQuestionLevel[]> {
    return await this.quizizzQuestionLevelService.getAll(_page, _limit, q);
  }

  /* lấy ra tất cả các câu hỏi theo level */
  @Get('/level-easy')
  async getAllLevelEasy(
    @Query('_page') _page: number = 1,
    @Query('_limit') _limit: number = 10,
    @Query('q') q: string = '',
  ): Promise<QuizizzQuestionLevel[]> {
    return await this.quizizzQuestionLevelService.getAllLevelEasy(
      _page,
      _limit,
      q,
    );
  }

  @Get('/level-medium')
  async getAllLevelMedium(
    @Query('_page') _page: number = 1,
    @Query('_limit') _limit: number = 10,
    @Query('q') q: string = '',
  ): Promise<QuizizzQuestionLevel[]> {
    return await this.quizizzQuestionLevelService.getAllLevelMedium(
      _page,
      _limit,
      q,
    );
  }

  @Get('/level-hard')
  async getAllLevelHard(
    @Query('_page') _page: number = 1,
    @Query('_limit') _limit: number = 10,
    @Query('q') q: string = '',
  ): Promise<QuizizzQuestionLevel[]> {
    return await this.quizizzQuestionLevelService.getAllLevelHard(
      _page,
      _limit,
      q,
    );
  }
}
