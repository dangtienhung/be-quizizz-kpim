import { QuestionType } from './../quizizz-quesstion-type/schema/question-type.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Body, NotFoundException } from '@nestjs/common';
import { PaginateModel } from 'mongoose';
import { QuizizzQuestion } from './schema/quizizz-question.schema';
import { CreateQuestionQuizizz } from './dto/create.dto';

@Injectable()
export class QuizizzQuestionService {
  constructor(
    @InjectModel(QuizizzQuestion.name)
    private readonly quizizzQuestionModel: PaginateModel<QuizizzQuestion>,
    @InjectModel(QuestionType.name)
    private questionTypeModel: PaginateModel<QuestionType>,
  ) {}

  /* thêm dữ liệu */
  async create(@Body() body: CreateQuestionQuizizz): Promise<QuizizzQuestion> {
    const question = await this.quizizzQuestionModel.create(body);
    if (!question) {
      throw new NotFoundException('Question not found');
    }
    /* update quiziz type */
    // await QuestionType.findB
    const questionType = await this.questionTypeModel.find();
    console.log(
      '🚀 ~ file: quizizz-question.service.ts:26 ~ QuizizzQuestionService ~ create ~ questionType:',
      questionType,
    );
    return question;
  }

  /* lấy tất cả dữ liệu */
  async getAll(
    _page: number,
    _limit: number,
    q: string,
  ): Promise<QuizizzQuestion[]> {
    const options = {
      page: _page,
      limit: _limit,
      sort: { createdAt: -1 },
      populate: [],
    };
    const query = q ? { title: { $regex: q, $options: 'i' } } : {};
    const questions = await this.quizizzQuestionModel.paginate(query, options);
    if (!questions) {
      throw new NotFoundException('Question not found');
    }
    return questions.docs;
  }
}
