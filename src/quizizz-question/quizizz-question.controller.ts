import { CreateQuestionQuizizz } from './dto/create.dto';
import {
  Controller,
  Body,
  Post,
  Query,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { QuizizzQuestionService } from './quizizz-question.service';
import { QuizizzQuestion } from './schema/quizizz-question.schema';
import { ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { UpdateQuestionQuizizz } from './dto/update.dto';

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

  @Get('detail/:id')
  async getDetail(@Param('id') id: ObjectId): Promise<QuizizzQuestion> {
    return await this.quizizzQuestionService.getDetail(id);
  }

  @Put('update/:id')
  async update(
    @Param('id') id: ObjectId,
    @Body() body: UpdateQuestionQuizizz,
  ): Promise<QuizizzQuestion> {
    return await this.quizizzQuestionService.update(id, body);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: ObjectId): Promise<QuizizzQuestion> {
    return await this.quizizzQuestionService.delete(id);
  }

  /* xóa mềm */
  @Put('soft-delete/:id')
  async softDelete(@Param('id') id: ObjectId): Promise<QuizizzQuestion> {
    return await this.quizizzQuestionService.softDelete(id);
  }

  /* phục hồi */
  @Put('restore/:id')
  async restore(@Param('id') id: ObjectId): Promise<QuizizzQuestion> {
    return await this.quizizzQuestionService.restore(id);
  }
}
