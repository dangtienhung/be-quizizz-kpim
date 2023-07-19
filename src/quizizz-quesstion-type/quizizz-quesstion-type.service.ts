import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginateModel } from 'mongoose';
import { QuestionType } from './schema/question-type.schema';
import { CreateQuestionType } from './dto/create.dto';
import { UpdateQuestionType } from './dto/update.dto';

@Injectable()
export class QuizizzQuesstionTypeService {
  constructor(
    @InjectModel(QuestionType.name)
    private readonly questionTypeModel: PaginateModel<QuestionType>,
  ) {}

  /* thêm dữ liệu */
  async create(questionType: CreateQuestionType): Promise<QuestionType> {
    const checkCode = await this.questionTypeModel
      .findOne({
        code: questionType.code,
      })
      .exec();
    if (checkCode) {
      throw new NotFoundException('Code already exists');
    }
    const newQuestionType = await this.questionTypeModel.create(questionType);
    if (!newQuestionType) {
      throw new NotFoundException('Create failed');
    }
    return newQuestionType;
  }

  /* lấy tất cả dữ liệu */
  async getAll(
    _page: number,
    _limit: number,
    q: string,
  ): Promise<QuestionType[]> {
    const options = {
      page: Number(_page),
      limit: Number(_limit),
      sort: { createdAt: -1 },
      populate: [],
    };
    const query = q
      ? [{ name: { $regex: q, $options: 'i' } }, { isDeleted: false }]
      : { isDeleted: false };
    const questionTypes = await this.questionTypeModel.paginate(query, options);
    if (!questionTypes) {
      throw new NotFoundException('No question type found');
    }
    return questionTypes.docs;
  }

  /* lấy dữ liệu theo id */
  async getDetail(id: string): Promise<QuestionType> {
    const questionType = await this.questionTypeModel
      .findOne({
        _id: id,
        isDeleted: false,
      })
      .exec();
    if (!questionType) {
      throw new NotFoundException('Question type not found');
    }
    return questionType;
  }

  /* cập nhật dữ liệu theo id */
  async update(id: string, body: UpdateQuestionType): Promise<QuestionType> {
    const questionType = await this.questionTypeModel
      .findOneAndUpdate({ _id: id, isDeleted: false }, body, { new: true })
      .exec();
    if (!questionType) {
      throw new NotFoundException('Question type not found');
    }
    return questionType;
  }

  /* xóa mềm dữ liệu theo id */
  async remove(id: string): Promise<QuestionType> {
    const questionType = await this.questionTypeModel
      .findOneAndUpdate(
        { _id: id, isDeleted: false },
        { isDeleted: true },
        { new: true },
      )
      .exec();
    if (!questionType) {
      throw new NotFoundException('Question type not found');
    }
    return questionType;
  }

  /* xóa vĩnh viễn dữ liệu theo id */
  async delete(id: string): Promise<QuestionType> {
    const questionType = await this.questionTypeModel
      .findOneAndDelete({ _id: id, isDeleted: false })
      .exec();
    if (!questionType) {
      throw new NotFoundException('Question type not found');
    }
    return questionType;
  }

  /* khôi phục lại dữ liệu */
  async restore(id: string): Promise<QuestionType> {
    const questionType = await this.questionTypeModel
      .findOneAndUpdate(
        { _id: id, isDeleted: true },
        { isDeleted: false },
        { new: true },
      )
      .exec();
    if (!questionType) {
      throw new NotFoundException('Question type not found');
    }
    return questionType;
  }

  /* lấy ra dánh sách dữ liệu chỉ có is delete true */
  async getTrash(
    _page: number,
    _limit: number,
    q: string,
  ): Promise<QuestionType[]> {
    const options = {
      page: Number(_page),
      limit: Number(_limit),
      sort: { createdAt: -1 },
      populate: [],
    };
    const query = q
      ? [{ name: { $regex: q, $options: 'i' } }, { isDeleted: true }]
      : { isDeleted: true };
    const questionTypes = await this.questionTypeModel.paginate(query, options);
    if (!questionTypes) {
      throw new NotFoundException('No question type found');
    }
    return questionTypes.docs;
  }
}
