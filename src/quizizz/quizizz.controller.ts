import {
  Controller,
  Query,
  Put,
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
import { UpdateQuizizzDto } from './dto/update.dto';

@ApiTags('Quizizz')
@Controller('api/quizizz')
export class QuizizzController {
  constructor(private readonly quizizzService: QuizizzService) {}

  /* get all */
  @Get('lists')
  async getAllQuizizzs(
    @Query('_page') _page = 1,
    @Query('_limit') _limit = 10,
    @Query('q') q = '',
  ): Promise<Quizizz[]> {
    return await this.quizizzService.getAllQuizizzs(_page, _limit, q);
  }

  /* get all quizizz by user id */
  @Get('lists/:id')
  async getAllQuizizzsByUserId(
    @Query('_page') _page = 1,
    @Query('_limit') _limit = 10,
    @Query('q') q = '',
    @Param('id') id: ObjectId,
  ): Promise<Quizizz[]> {
    return await this.quizizzService.getAllQuizizzsByUserId(
      _page,
      _limit,
      q,
      id,
    );
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

  /* update */
  @Put('update/:id')
  async update(
    @Param('id') id: ObjectId,
    @Body() body: UpdateQuizizzDto,
  ): Promise<Quizizz> {
    return await this.quizizzService.update(id, body);
  }
}
