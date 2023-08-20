import { Controller, Get, Param, Query, Post, Body } from '@nestjs/common';
import { QuizActivityService } from './quiz-activity.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateQuizizzActivityDto } from './dto/create.dto';
import { QuizActivity } from './schemas/quiz-activity.schemas';

@ApiTags('Quiz Activity')
@Controller('api/quiz-activity')
export class QuizActivityController {
  constructor(private readonly quizActivityService: QuizActivityService) {}

  /* lấy ra tất cả các bài quizizz mà người dùng chơi */
  @Get('list-all')
  async findAllQuizizzActivity(
    @Query('_page') _page = 1,
    @Query('_limit') _limit = 10,
    @Query('userId') userId: string,
  ) {
    return this.quizActivityService.findAllQuizizzActivityByUserId({
      userId,
      _page,
      _limit,
    });
  }

  @Get('list')
  async findAll(
    @Query('useId') useId: string,
    @Query('roomId') roomId: string,
  ): Promise<any> {
    return this.quizActivityService.findAll({ useId, roomId });
  }

  @Post('create')
  async create(@Body() quizActivity: CreateQuizizzActivityDto): Promise<any> {
    return this.quizActivityService.create(quizActivity);
  }

  /* get one */
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<QuizActivity> {
    return this.quizActivityService.findOne(id);
  }
}
