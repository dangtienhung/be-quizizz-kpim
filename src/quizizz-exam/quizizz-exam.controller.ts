import {
  Controller,
  Get,
  Put,
  Query,
  Post,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { QuizizzExamService } from './quizizz-exam.service';
import { QuizizzExam } from './schema/quizizz-exam.schema';
import { ApiTags } from '@nestjs/swagger';
import { CreateQuizizzExam } from './dto/create.dto';
import { ObjectId } from 'mongoose';
import { UpdateQuizizzExam } from './dto/update.dto';

@ApiTags('Quizizz Exam')
@Controller('api/quizizz-exam')
export class QuizizzExamController {
  constructor(private readonly quizizzExamService: QuizizzExamService) {}

  @Get('/lists')
  async findAll(
    @Query('_page') _page: number = 1,
    @Query('_limit') _limit: number = 10,
    @Query('q') q: string = '',
  ): Promise<QuizizzExam[]> {
    return this.quizizzExamService.findAll(_page, _limit, q);
  }

  @Post('/create')
  async create(@Body() body: CreateQuizizzExam): Promise<QuizizzExam> {
    return this.quizizzExamService.create(body);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: ObjectId): Promise<QuizizzExam> {
    return this.quizizzExamService.delete(id);
  }

  @Get('/detail/:id')
  async detail(@Param('id') id: ObjectId): Promise<QuizizzExam> {
    return this.quizizzExamService.getOne(id);
  }

  @Put('/update/:id')
  async update(
    @Param('id') id: ObjectId,
    @Body() body: UpdateQuizizzExam,
  ): Promise<QuizizzExam> {
    return this.quizizzExamService.update(id, body);
  }
}
