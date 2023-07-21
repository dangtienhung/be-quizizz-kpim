import { QuestionType } from './../quizizz-quesstion-type/schema/question-type.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Body, NotFoundException } from '@nestjs/common';
import { ObjectId, PaginateModel } from 'mongoose';
import { QuizizzQuestion } from './schema/quizizz-question.schema';
import { CreateQuestionQuizizz } from './dto/create.dto';
import { QuizizzAnswer } from 'src/quizizz-answer/schema/quizizz-answer.schema';
import { QuizizzQuestionLevel } from 'src/quizizz-question-level/schema/quizizz-question-level.schema';
import { QuizizzQuestionGroup } from 'src/quizizz-question-group/schema/quizizz-question-group.schema';
import { UpdateQuestionQuizizz } from './dto/update.dto';

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
    await this.questionTypeModel
      .findByIdAndUpdate(
        { _id: question.questionType },
        { $addToSet: { questions: question._id } },
      )
      .exec();
    /* update quizizz question level */
    await this.quizizzQuestionLevelModel
      .findByIdAndUpdate(
        { _id: question.questionLevel },
        { $addToSet: { questions: question._id } },
      )
      .exec();
    /* update quizizz question group */
    await this.quizizzQuestionGroupModel
      .findByIdAndUpdate(
        { _id: question.questionGroup },
        { $addToSet: { questions: question._id } },
      )
      .exec();
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

  /* lấy chi tiết dữ liệu */
  async getDetail(id: ObjectId): Promise<QuizizzQuestion> {
    const question = await this.quizizzQuestionModel
      .findById(id)
      .populate([
        { path: 'questionLevel', select: '-questions -quizz_question' },
        { path: 'questionGroup', select: '-questions -isDeleted' },
        {
          path: 'questionType',
          model: QuestionType.name,
          select: '-questions -isDeleted',
        },
        { path: 'questionAnswers', select: '-quizz_question' },
      ])
      .exec();
    if (!question) {
      throw new NotFoundException('Question not found');
    }
    return question;
  }

  /* cập nhật dữ liệu */
  async update(
    id: ObjectId,
    body: UpdateQuestionQuizizz,
  ): Promise<QuizizzQuestion> {
    /* tìm xem question có tồn tại không */
    const questionExist = await this.quizizzQuestionModel.findById(id).exec();
    if (!questionExist) {
      throw new NotFoundException('Question not found');
    }
    /* cập nhật câu hỏi */
    const answersId = questionExist.questionAnswers;
    /* xóa hết các câu hỏi cũ đi */
    if (answersId.length > 0) {
      for (let answerId of answersId) {
        await this.quizizzAnswerModel.findByIdAndDelete(answerId);
      }
    }
    /* update quiziz answer */
    const answerIds = [];
    const answers = body.questionAnswers;
    if (answers.length > 0) {
      for (let answer of answers) {
        const newAnswer = await this.quizizzAnswerModel.create(answer);
        if (!newAnswer) {
          throw new NotFoundException('Answer not found');
        }
        answerIds.push(newAnswer._id);
      }
    }
    /* tạo mới câu trả lời */
    body.questionAnswers = answerIds;
    const question = await this.quizizzQuestionModel
      .findByIdAndUpdate({ _id: id }, body, { new: true })
      .exec();
    if (!question) {
      throw new NotFoundException('Question not found');
    }
    /* update quiziz answer */
    if (answerIds.length > 0) {
      for (let answerId of answerIds) {
        await this.quizizzAnswerModel.findByIdAndUpdate(
          { _id: answerId },
          { $addToSet: { quizz_question: question._id } },
        );
      }
    }
    /* update quizizz question type */
    await this.questionTypeModel.findByIdAndUpdate(
      { _id: question.questionType },
      { $pull: { questions: question._id } },
    );
    await this.questionTypeModel.findByIdAndUpdate(
      { _id: body.questionType },
      { $addToSet: { questions: question._id } },
    );
    /* update quizizz question level */
    await this.quizizzQuestionLevelModel.findByIdAndUpdate(
      { _id: question.questionLevel },
      { $pull: { questions: question._id } },
    );
    await this.quizizzQuestionLevelModel.findByIdAndUpdate(
      { _id: body.questionLevel },
      { $addToSet: { questions: question._id } },
    );
    /* update quizizz question group */
    await this.quizizzQuestionGroupModel.findByIdAndUpdate(
      { _id: question.questionGroup },
      { $pull: { questions: question._id } },
    );
    await this.quizizzQuestionGroupModel.findByIdAndUpdate(
      { _id: body.questionGroup },
      { $addToSet: { questions: question._id } },
    );
    return question;
  }

  /* xóa cứng dữ liệu */
  async delete(id: ObjectId): Promise<QuizizzQuestion> {
    /* tìm question xem quizizz có tồn tại hay không */
    const question = await this.quizizzQuestionModel.findById(id).exec();
    if (!question) {
      throw new NotFoundException('Question not found');
    }
    /* xóa các câu trả lời */
    const answersId = question.questionAnswers;
    if (answersId.length > 0) {
      for (let answerId of answersId) {
        await this.quizizzAnswerModel.findByIdAndDelete(answerId).exec();
      }
    }
    /* xóa id câu hỏi ra khỏi quizizz level */
    await this.quizizzQuestionLevelModel
      .findByIdAndUpdate(
        { _id: question.questionLevel },
        { $pull: { questions: question._id } },
      )
      .exec();
    /* xóa id câu hỏi ra khỏi quizizz group */
    await this.quizizzQuestionGroupModel
      .findByIdAndUpdate(
        { _id: question.questionGroup },
        { $pull: { questions: question._id } },
      )
      .exec();
    /* xóa id câu hỏi ra khỏi quizizz type */
    await this.questionTypeModel
      .findByIdAndUpdate(
        { _id: question.questionType },
        { $pull: { questions: question._id } },
      )
      .exec();
    /* xóa câu hỏi */
    const questionDeleted = await this.quizizzQuestionModel
      .findByIdAndDelete(id)
      .exec();
    if (!questionDeleted) {
      throw new NotFoundException('Question not found');
    }
    return questionDeleted;
  }

  private async updateQuestionStatus(
    id: ObjectId,
    isDeleted: boolean,
  ): Promise<QuizizzQuestion> {
    const question = await this.quizizzQuestionModel
      .findByIdAndUpdate({ _id: id }, { isDeleted }, { new: true })
      .exec();
    if (!question) {
      throw new NotFoundException('Question not found');
    }
    return question;
  }

  /* xóa mềm dữ liệu */
  async softDelete(id: ObjectId): Promise<QuizizzQuestion> {
    return await this.updateQuestionStatus(id, true);
  }

  /* phục hồi dữ liệu */
  async restore(id: ObjectId): Promise<QuizizzQuestion> {
    return await this.updateQuestionStatus(id, false);
  }
}
