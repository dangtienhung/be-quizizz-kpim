import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { CreateQuestionType } from './dto/create.dto';
import { QuizizzQuesstionTypeService } from './quizizz-quesstion-type.service';
import { QuestionType } from './schema/question-type.schema';
import { v4 as uuidv4 } from 'uuid';
import { UpdateQuestionType } from './dto/update.dto';

@ApiTags('Quizizz Quesstion Type')
@Controller('api/quizizz-quesstion-type')
export class QuizizzQuesstionTypeController {
  constructor(
    private readonly quizizzQuesstionTypeService: QuizizzQuesstionTypeService,
  ) {}

  /* thêm dữ liệu */
  @Post('create')
  async create(@Body() body: CreateQuestionType): Promise<QuestionType> {
    body.code = uuidv4();
    return await this.quizizzQuesstionTypeService.create(body);
  }

  /* lấy tất cả dữ liệu */
  @Get('lists')
  async getAll(
    @Query('_page') _page = 1,
    @Query('_limit') _limit = 10,
    @Query('q') q = '',
  ): Promise<QuestionType[]> {
    return await this.quizizzQuesstionTypeService.getAll(_page, _limit, q);
  }

  /* lấy dữ liệu theo id */
  @Get('detail/:id')
  async getDetail(@Param('id') id: string): Promise<QuestionType> {
    return await this.quizizzQuesstionTypeService.getDetail(id);
  }

  /* cập nhật dữ liệu theo id */
  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateQuestionType,
  ): Promise<QuestionType> {
    return await this.quizizzQuesstionTypeService.update(id, body);
  }

  /* xóa mềm dữ liệu theo id */
  @Put('fake-remove/:id')
  async remove(@Param('id') id: string): Promise<QuestionType> {
    return await this.quizizzQuesstionTypeService.remove(id);
  }

  /* xóa vĩnh viễn dữ liệu theo id */
  @Delete('delete/:id')
  async delete(@Param('id') id: string): Promise<QuestionType> {
    return await this.quizizzQuesstionTypeService.delete(id);
  }

  /* khôi phục lại dữ liệu */
  @Put('restore/:id')
  async restore(@Param('id') id: string): Promise<QuestionType> {
    return await this.quizizzQuesstionTypeService.restore(id);
  }

  /* lấy ra dánh sách dữ liệu chỉ có is delete true */
  @Get('trash')
  async getTrash(
    @Query('_page') _page = 1,
    @Query('_limit') _limit = 10,
    @Query('q') q = '',
  ): Promise<QuestionType[]> {
    return await this.quizizzQuesstionTypeService.getTrash(_page, _limit, q);
  }
}
