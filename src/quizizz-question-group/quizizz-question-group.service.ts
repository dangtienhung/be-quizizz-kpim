import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginateModel } from 'mongoose';
import { QuizizzQuestionGroup } from './schema/quizizz-question-group.schema';
import { CreateQuizizzQuestionGroupDto } from './dto/create.dto';
import { UpdateQuizizzQuestionGroupDto } from './dto/update.dto';

@Injectable()
export class QuizizzQuestionGroupService {
  constructor(
    @InjectModel(QuizizzQuestionGroup.name)
    private readonly quizizzQuesstionGroupModel: PaginateModel<QuizizzQuestionGroup>,
  ) {}

  async create(
    quizzGroup: CreateQuizizzQuestionGroupDto,
  ): Promise<QuizizzQuestionGroup> {
    const body = quizzGroup;
    const newQuizzGroup = await this.quizizzQuesstionGroupModel.create(body);
    if (!newQuizzGroup) {
      throw new NotFoundException('Cannot create new quizz group');
    }
    return newQuizzGroup;
  }

  /* lấy ra tất cả các sản phẩm */
  async getAll(
    _page: number,
    _limit: number,
    q: string,
  ): Promise<QuizizzQuestionGroup[]> {
    const option = {
      page: Number(_page),
      limit: Number(_limit),
    };
    const query = q
      ? {
          $or: [
            { name: { $regex: q, $options: 'i' } },
            { code: { $regex: q, $options: 'i' } },
          ],
        }
      : {};
    const result = await this.quizizzQuesstionGroupModel.paginate(
      query,
      option,
    );
    if (!result) {
      throw new NotFoundException('Cannot get all quizz group');
    }
    return result.docs;
  }

  async getAllByDeleteStatus(
    _page: number,
    _limit: number,
    q: string,
    isDeleted: boolean,
  ): Promise<QuizizzQuestionGroup[]> {
    const option = {
      page: Number(_page),
      limit: Number(_limit),
    };
    const query = q
      ? {
          $or: [
            { name: { $regex: q, $options: 'i' } },
            { code: { $regex: q, $options: 'i' } },
          ],
          isDeleted,
        }
      : { isDeleted };
    const result = await this.quizizzQuesstionGroupModel.paginate(
      query,
      option,
    );
    if (!result) {
      throw new NotFoundException('Cannot get all quizz group');
    }
    return result.docs;
  }

  /* lấy ra các quizizz group delete false */
  async getAllRestore(
    _page: number,
    _limit: number,
    q: string,
  ): Promise<QuizizzQuestionGroup[]> {
    return this.getAllByDeleteStatus(_page, _limit, q, false);
  }

  /* lấy ra các quizizz group delete true */
  async getAllDelete(
    _page: number,
    _limit: number,
    q: string,
  ): Promise<QuizizzQuestionGroup[]> {
    return this.getAllByDeleteStatus(_page, _limit, q, true);
  }

  /* lấy ra 1 sản phẩm */
  async getOne(id: string): Promise<QuizizzQuestionGroup> {
    const result = await this.quizizzQuesstionGroupModel.findById(id).exec();
    if (!result) {
      throw new NotFoundException('Cannot get quizz group');
    }
    return result;
  }

  /* cập nhật 1 sản phẩm */
  async update(id: string, body: UpdateQuizizzQuestionGroupDto) {
    const result = await this.quizizzQuesstionGroupModel
      .findByIdAndUpdate(id, body, { new: true })
      .exec();
    if (!result) {
      throw new NotFoundException('Cannot update quizz group');
    }
    return result;
  }

  /* xóa 1 sản phẩm */
  async delete(id: string): Promise<{ message: string }> {
    const result = await this.quizizzQuesstionGroupModel
      .findByIdAndDelete(id)
      .exec();
    if (!result) {
      throw new NotFoundException('Cannot delete quizz group');
    }
    return { message: 'Delete quizz group successfully' };
  }

  /* cập nhật lại trạng thái sản phẩm */
  updateStatus(id: string, status: boolean) {
    const result = this.quizizzQuesstionGroupModel
      .findByIdAndUpdate(id, { isDeleted: status }, { new: true })
      .exec();
    return result;
  }

  /* xóa giả sản phẩm */
  async softDelete(id: string): Promise<{ message: string }> {
    const result = await this.updateStatus(id, true);
    if (!result) {
      throw new NotFoundException('Cannot soft delete quizz group');
    }
    return { message: 'Soft delete quizz group successfully' };
  }

  /* khôi phục lại sản phẩm */
  async restore(id: string): Promise<{ message: string }> {
    const result = await this.updateStatus(id, false);
    if (!result) {
      throw new NotFoundException('Cannot restore quizz group');
    }
    return { message: 'Restore quizz group successfully' };
  }
}
