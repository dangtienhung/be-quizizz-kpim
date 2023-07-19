import { QuestionType } from './../quizizz-quesstion-type/schema/question-type.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Body, NotFoundException } from '@nestjs/common';
import { PaginateModel } from 'mongoose';
import { QuizizzQuestion } from './schema/quizizz-question.schema';
import { CreateQuestionQuizizz } from './dto/create.dto';
import { QuizizzAnswer } from 'src/quizizz-answer/schema/quizizz-answer.schema';
import { QuizizzQuestionLevel } from 'src/quizizz-question-level/schema/quizizz-question-level.schema';
import { QuizizzQuestionGroup } from 'src/quizizz-question-group/schema/quizizz-question-group.schema';

@Injectable()
export class QuizizzQuestionService {
  constructor(
    @InjectModel(QuizizzQuestion.name)
    private readonly quizizzQuestionModel: PaginateModel<QuizizzQuestion>,
    @InjectModel(QuestionType.name)
    private questionTypeModel: PaginateModel<QuestionType>,
    @InjectModel(QuizizzAnswer.name)
    private quizizzAnswerModel: PaginateModel<QuizizzAnswer>,
    @InjectModel(QuizizzQuestionLevel.name)
    private quizizzQuestionLevelModel: PaginateModel<QuizizzQuestionLevel>,
    @InjectModel(QuizizzQuestionGroup.name)
    private quizizzQuestionGroupModel: PaginateModel<QuizizzQuestionGroup>,
  ) {}

  /* thêm dữ liệu */
  async create(@Body() body: CreateQuestionQuizizz): Promise<QuizizzQuestion> {
    const answers = body.questionAnswers;
    /* tạo mới câu trả lời */
    const answersId = [];
    if (answers.length > 0) {
      for (let answer of answers) {
        const newAnswer = await this.quizizzAnswerModel.create(answer);
        if (!newAnswer) {
          throw new NotFoundException('Answer not found');
        }
        answersId.push(newAnswer._id);
      }
    }
    body.questionAnswers = answersId;
    const question = await this.quizizzQuestionModel.create(body);
    if (!question) {
      throw new NotFoundException('Question not found');
    }
    /* update quiziz answer */
    for (let answerId of answersId) {
      const questionQuestionAnswer = await this.quizizzAnswerModel
        .findById({ _id: answerId })
        .exec();
      if (!questionQuestionAnswer) {
        throw new NotFoundException('Question type not found');
      }
      await this.quizizzAnswerModel
        .findByIdAndUpdate(
          { _id: answerId },
          { $addToSet: { quizz_question: question._id } },
        )
        .exec();
    }
    /* update quizizz question type */
    await this.questionTypeModel.findByIdAndUpdate(
      { _id: question.questionType },
      { $addToSet: { questions: question._id } },
    );
    /* update quizizz question level */
    await this.quizizzQuestionLevelModel.findByIdAndUpdate(
      { _id: question.questionLevel },
      { $addToSet: { questions: question._id } },
    );
    /* update quizizz question group */
    await this.quizizzQuestionGroupModel.findByIdAndUpdate(
      { _id: question.questionGroup },
      { $addToSet: { questions: question._id } },
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
      populate: [
        { path: 'questionLevel', select: '-questions -quizz_question' },
        { path: 'questionGroup', select: '-questions -isDeleted' },
        {
          path: 'questionType',
          model: QuestionType.name,
          select: '-questions -isDeleted',
        },
        { path: 'questionAnswers', select: '-quizz_question' },
      ],
    };
    const query = q ? { title: { $regex: q, $options: 'i' } } : {};
    const questions = await this.quizizzQuestionModel.paginate(query, options);
    if (!questions) {
      throw new NotFoundException('Question not found');
    }
    return questions.docs;
  }
}
