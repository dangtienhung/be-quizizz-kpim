import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QuizizzQuestionGroupService } from './quizizz-question-group.service';
import { CreateQuizizzQuestionGroupDto } from './dto/create.dto';
import { QuizizzQuestionGroup } from './schema/quizizz-question-group.schema';
import { UpdateQuizizzQuestionGroupDto } from './dto/update.dto';

@ApiTags('Quizizz Question Group')
@Controller('api/quizizz-question-group')
export class QuizizzQuestionGroupController {
  constructor(
    private readonly quizizzQuestionGroupService: QuizizzQuestionGroupService,
  ) {}

  /* thêm dạng group câu hỏi */
  @Post('create')
  async create(
    @Body() body: CreateQuizizzQuestionGroupDto,
  ): Promise<{ name: string }> {
    return this.quizizzQuestionGroupService.create(body);
  }

  /* lấy danh sách group câu hỏi */
  @Get('/lists')
  async getAllLists(
    @Query('_page') _page: number = 1,
    @Query('_limit') _limit: number = 10,
    @Query('q') q: string = '',
  ): Promise<QuizizzQuestionGroup[]> {
    return await this.quizizzQuestionGroupService.getAll(_page, _limit, q);
  }

  /* lấy ra 1 group câu hỏi */
  @Get('/list/:id')
  async getOne(@Param('id') id: string): Promise<QuizizzQuestionGroup> {
    return await this.quizizzQuestionGroupService.getOne(id);
  }

  /* cập nhật 1 group câu hỏi */
  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateQuizizzQuestionGroupDto,
  ): Promise<QuizizzQuestionGroup> {
    return await this.quizizzQuestionGroupService.update(id, body);
  }

  /* xóa 1 group câu hỏi */
  @Delete('delete/:id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    return await this.quizizzQuestionGroupService.delete(id);
  }

  /* xóa giả group câu hỏi */
  @Put('update-status/:id')
  async updateStatus(@Param('id') id: string): Promise<{ message: string }> {
    return await this.quizizzQuestionGroupService.softDelete(id);
  }

  /* khôi phục lại nhóm câu hỏi */
  @Put('restore/:id')
  async restore(@Param('id') id: string): Promise<{ message: string }> {
    return await this.quizizzQuestionGroupService.restore(id);
  }

  /* lấy ra các quizizz group delete false */
  @Get('/lists-restore')
  async getAllRestore(
    @Query('_page') _page: number = 1,
    @Query('_limit') _limit: number = 10,
    @Query('q') q: string = '',
  ): Promise<QuizizzQuestionGroup[]> {
    return await this.quizizzQuestionGroupService.getAllRestore(
      _page,
      _limit,
      q,
    );
  }

  /* lấy ra các quizizz group delete true */
  @Get('/lists-delete')
  async getAllDelete(
    @Query('_page') _page: number = 1,
    @Query('_limit') _limit: number = 10,
    @Query('q') q: string = '',
  ): Promise<QuizizzQuestionGroup[]> {
    return await this.quizizzQuestionGroupService.getAllDelete(
      _page,
      _limit,
      q,
    );
  }
}
