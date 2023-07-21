import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId, PaginateModel } from 'mongoose';
import { QuizizzExam } from './schema/quizizz-exam.schema';
import { CreateQuizizzExam } from './dto/create.dto';

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
      populate: [],
    };
    const query = q ? { $text: { $search: q } } : {};
    const quizizzExams = await this.quizizzExamModel.paginate(query, options);
    if (!quizizzExams) {
      throw new NotFoundException('Not found quizizz exam');
    }
    return quizizzExams.docs;
  }

  async create(quizizzExam: CreateQuizizzExam): Promise<any> {
    console.log(
      '🚀 ~ file: quizizz-exam.service.ts:34 ~ QuizizzExamService ~ create ~ quizizzExam:',
      quizizzExam,
    );
    // const newQuizizzExam = await this.quizizzExamModel.create(quizizzExam);
    // if (!newQuizizzExam) {
    //   throw new NotFoundException('Not found quizizz exam');
    // }
    return { ahihi: 'ahihi' };
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
}
