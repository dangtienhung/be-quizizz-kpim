import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId, PaginateModel } from 'mongoose';
import { QuizizzExam } from './schema/quizizz-exam.schema';
import { CreateQuizizzExam } from './dto/create.dto';
import { UpdateQuizizzExam } from './dto/update.dto';
import { QuizizzExamQuestion } from 'src/quizizz-exam-question/schema/quizizz-exam-question.schema';
import { Quizizz } from 'src/quizizz/schema/quizizz.schema';

@Injectable()
export class QuizizzExamService {
  constructor(
    @InjectModel(QuizizzExam.name)
    private quizizzExamModel: PaginateModel<QuizizzExam>,
    @InjectModel(QuizizzExamQuestion.name)
    private quizizzExamQuestionModel: PaginateModel<QuizizzExamQuestion>,
    @InjectModel(Quizizz.name)
    private quizizzModel: PaginateModel<Quizizz>,
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
              select: 'title score questionAnswers',
              populate: [
                { path: 'questionAnswers', select: '-quizz_question' },
              ],
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

  async create(quizizzExam: CreateQuizizzExam): Promise<any> {
    const newQuizizzExam = await this.quizizzExamModel.create(quizizzExam);
    if (!newQuizizzExam) {
      throw new NotFoundException('Not found quizizz exam');
    }
    console.log(
      '🚀 ~ file: quizizz-exam.service.ts:58 ~ QuizizzExamService ~ create ~ newQuizizzExam:',
      newQuizizzExam,
    );
    console.log(quizizzExam.questions[0]);
    await this.quizizzModel.findByIdAndUpdate(
      { _id: quizizzExam.questions[0] },
      { title: newQuizizzExam.title },
      { new: true },
    );
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
              select: '_id title score questionAnswers timer',
              populate: [{ path: 'questionAnswers', select: '_id content' }],
            },
          ],
        },
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
