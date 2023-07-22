import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId, PaginateModel } from 'mongoose';
import { QuizizzExam } from './schema/quizizz-exam.schema';
import { CreateQuizizzExam } from './dto/create.dto';
import { UpdateQuizizzExam } from './dto/update.dto';

@Injectable()
export class QuizizzExamService {
  constructor(
    @InjectModel(QuizizzExam.name)
    private quizizzExamModel: PaginateModel<QuizizzExam>,
  ) {}

  async findAll(
    _page: number,
    _limit: number,
    q: string,
  ): Promise<QuizizzExam[]> {
    const options = {
      page: _page,
      limit: _limit,
      sort: { createdAt: -1 },
      populate: [
        {
          path: 'questions',
          select: 'questions',
          populate: [
            {
              path: 'questions',
              select: 'title score',
            },
          ],
        },
        { path: 'user', select: 'name' },
      ],
    };
    const query = q ? { $title: { $search: q } } : {};
    const quizizzExams = await this.quizizzExamModel.paginate(query, options);
    if (!quizizzExams) {
      throw new NotFoundException('Not found quizizz exam');
    }
    return quizizzExams.docs;
  }

  async create(quizizzExam: CreateQuizizzExam): Promise<QuizizzExam> {
    const newQuizizzExam = await this.quizizzExamModel.create(quizizzExam);
    if (!newQuizizzExam) {
      throw new NotFoundException('Not found quizizz exam');
    }
    return newQuizizzExam;
  }

  async delete(id: ObjectId): Promise<QuizizzExam> {
    const quizizzExam = await this.quizizzExamModel
      .findByIdAndDelete(id)
      .exec();
    if (!quizizzExam) {
      throw new NotFoundException('Not found quizizz exam');
    }
    return quizizzExam;
  }

  async getOne(id: ObjectId): Promise<QuizizzExam> {
    const quizizzExam = await this.quizizzExamModel
      .findById(id)
      .populate([
        {
          path: 'questions',
          select: 'questions',
          populate: [
            {
              path: 'questions',
              select: 'title score',
            },
          ],
        },
        { path: 'user', select: 'name' },
      ])
      .exec();
    if (!quizizzExam) {
      throw new NotFoundException('Not found quizizz exam');
    }
    return quizizzExam;
  }

  async update(id: ObjectId, body: UpdateQuizizzExam): Promise<QuizizzExam> {
    const quizizzExam = await this.quizizzExamModel
      .findByIdAndUpdate({ _id: id }, body, { new: true })
      .exec();
    if (!quizizzExam) {
      throw new NotFoundException('Not found quizizz exam');
    }
    return quizizzExam;
  }
}
