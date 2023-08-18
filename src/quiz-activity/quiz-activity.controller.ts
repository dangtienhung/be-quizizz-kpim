import { Controller, Get, Param, Query, Post, Body } from '@nestjs/common';
import { QuizActivityService } from './quiz-activity.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateQuizizzActivityDto } from './dto/create.dto';

@ApiTags('Quiz Activity')
@Controller('api/quiz-activity')
export class QuizActivityController {
  constructor(private readonly quizActivityService: QuizActivityService) {}

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
}
