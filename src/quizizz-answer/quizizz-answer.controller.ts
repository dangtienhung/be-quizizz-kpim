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
  @Get(':id')
  async getDetail(@Param() id: string): Promise<QuizizzAnswer> {
    return await this.quizizzAnswerService.getDetail(id);
  }

  /* get list */
  // @Get()
}
