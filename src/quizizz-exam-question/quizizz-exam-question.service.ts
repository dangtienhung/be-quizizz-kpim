import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QuizizzExamQuestion } from './schema/quizizz-exam-question.schema';
import { ObjectId, PaginateModel } from 'mongoose';

@Injectable()
export class QuizizzExamQuestionService {
  constructor(
    @InjectModel(QuizizzExamQuestion.name)
    private quizizzExamQuestionModel: PaginateModel<QuizizzExamQuestion>,
  ) {}

  async findAll(
    _page: number,
    _limit: number,
    q: string,
  ): Promise<QuizizzExamQuestion[]> {
    const options = {
      page: _page,
      limit: _limit,
      sort: { createdAt: -1 },
      populate: [
        { path: 'questions' },
        { path: 'questionExam', select: 'title' },
      ],
    };
    const query = q ? { $title: { $search: q } } : {};
    const quizizzExamQuestions = await this.quizizzExamQuestionModel.paginate(
      query,
      options,
    );
    if (!quizizzExamQuestions) {
      throw new NotFoundException('Not found quizizz exam question');
    }
    return quizizzExamQuestions.docs;
  }

  /* delete quizizz exam */
  async delete(id: ObjectId): Promise<{ message: string }> {
    const quizizz = await this.quizizzExamQuestionModel.findByIdAndDelete(id);
    if (!quizizz) {
      throw new NotFoundException('Not found quizizz exam question');
    }
    return { message: 'Delete quizizz exam question success' };
  }
}
