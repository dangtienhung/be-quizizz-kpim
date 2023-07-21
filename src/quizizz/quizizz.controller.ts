import {
  Controller,
  Query,
  Get,
  Post,
  Body,
  Delete,
  Param,
} from '@nestjs/common';
import { QuizizzService } from './quizizz.service';
import { Quizizz } from './schema/quizizz.schema';
import { CreateQuizizzDto } from './dto/create.dto';
import slugify from 'slugify';
import { ObjectId } from 'mongoose';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Quizizz')
@Controller('api/quizizz')
export class QuizizzController {
  constructor(private readonly quizizzService: QuizizzService) {}

  /* get all */
  @Get('lists')
  async getAllQuizizzs(
    @Query('_page') _page: number = 1,
    @Query('_limit') _limit: number = 10,
    @Query('q') q: string = '',
  ): Promise<Quizizz[]> {
    return await this.quizizzService.getAllQuizizzs(_page, _limit, q);
  }

  /* create */
  @Post('/create')
  async create(@Body() body: CreateQuizizzDto): Promise<Quizizz> {
    const slug = slugify(body.title, { lower: true });
    body.slug = slug;
    return await this.quizizzService.create(body);
  }

  /* delete */
  @Delete('delete/:id')
  async delete(@Param('id') id: ObjectId): Promise<{ message: string }> {
    return await this.quizizzService.delete(id);
  }

  /* get one */
  @Get('detail/:id')
  async getOneQuizizz(@Param('id') id: ObjectId): Promise<Quizizz> {
    return await this.quizizzService.getOneQuizizz(id);
  }
}
