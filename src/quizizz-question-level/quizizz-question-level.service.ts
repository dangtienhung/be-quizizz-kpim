import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import {
  Level,
  QuizizzQuestionLevel,
} from './schema/quizizz-question-level.schema';
import { CreateQuizizzLevelDto } from './dto/create.dto';

@Injectable()
export class QuizizzQuestionLevelService {
  constructor(
    @InjectModel(QuizizzQuestionLevel.name)
    private readonly model: PaginateModel<QuizizzQuestionLevel>,
  ) {}

  async create(body: CreateQuizizzLevelDto): Promise<QuizizzQuestionLevel> {
    const quizizzQuestionLevel = await this.model.create(body);
    if (!quizizzQuestionLevel) {
      throw new NotFoundException('Không thể tạo câu hỏi');
    }
    return quizizzQuestionLevel;
  }

  async getAll(
    _page: number,
    _limit: number,
    q: string,
  ): Promise<QuizizzQuestionLevel[]> {
    const options = {
      page: _page,
      limit: _limit,
      sort: { createdAt: -1 },
      populate: [],
    };
    const query = q ? [{ content: { $regex: q, $options: 'i' } }] : {};
    const quizizzQuestionLevels = await this.model.paginate(query, options);
    if (!quizizzQuestionLevels) {
      throw new NotFoundException('Không tìm thấy câu hỏi');
    }
    return quizizzQuestionLevels.docs;
  }

  async getListByLevel(
    _page: number,
    _limit: number,
    q: string,
    level: Level,
  ): Promise<QuizizzQuestionLevel[]> {
    const options = {
      page: _page,
      limit: _limit,
      sort: { createdAt: -1 },
      populate: [],
    };
    const query = q
      ? {
          content: level,
          $or: [{ name: { $regex: q, $options: 'i' } }],
        }
      : { content: level };
    const quizizzQuestionLevels = await this.model.paginate(query, options);
    if (!quizizzQuestionLevels) {
      throw new NotFoundException('Không tìm thấy câu hỏi');
    }
    return quizizzQuestionLevels.docs;
  }

  async getAllLevelEasy(
    _page: number,
    _limit: number,
    q: string,
  ): Promise<QuizizzQuestionLevel[]> {
    return this.getListByLevel(_page, _limit, q, Level.EASY);
  }

  async getAllLevelMedium(
    _page: number,
    _limit: number,
    q: string,
  ): Promise<QuizizzQuestionLevel[]> {
    return this.getListByLevel(_page, _limit, q, Level.MEDIUM);
  }

  async getAllLevelHard(
    _page: number,
    _limit: number,
    q: string,
  ): Promise<QuizizzQuestionLevel[]> {
    return this.getListByLevel(_page, _limit, q, Level.HARD);
  }
}
