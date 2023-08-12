import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { ObjectId, PaginateModel } from 'mongoose';
import { Quizizz } from './schema/quizizz.schema';
import { QuizizzQuestion } from 'src/quizizz-question/schema/quizizz-question.schema';
import { QuestionType } from 'src/quizizz-quesstion-type/schema/question-type.schema';
import { CreateQuizizzDto } from './dto/create.dto';
import { User } from 'src/user/schema/user.schema';
import { UpdateQuizizzDto } from './dto/update.dto';

@Injectable()
export class QuizizzService {
  constructor(
    @InjectModel(Quizizz.name) private quizizzModel: PaginateModel<Quizizz>,
    @InjectModel(QuizizzQuestion.name)
    private quizizzQuestionModel: PaginateModel<QuizizzQuestion>,
    @InjectModel(QuestionType.name)
    private questionTypeModel: PaginateModel<QuestionType>,
    @InjectModel(User.name) private userModel: PaginateModel<User>,
  ) {}

  async getAllQuizizzs(
    _page: number,
    _limit: number,
    q: string,
  ): Promise<Quizizz[]> {
    const options = {
      page: _page,
      limit: _limit,
      sort: { createdAt: -1 },
      populate: [
        {
          path: 'questions',
          select: '_id title score',
          populate: [
            { path: 'questionAnswers', select: '_id content isCorrect' },
          ],
        },
        { path: 'user', select: '-password -quizz -quizzExam -quizizz' },
      ],
    };
    const query = q ? { $title: { $search: q } } : {};
    const quizizzs = await this.quizizzModel.paginate(query, options);
    if (!quizizzs) {
      throw new NotFoundException('Not found quizizz');
    }
    return quizizzs.docs;
  }

  /* lấy ra tất cả các bài quiz theo id của user */
  async getAllQuizizzsByUserId(
    _page: number,
    _limit: number,
    q: string,
    userId: ObjectId,
  ): Promise<Quizizz[]> {
    const options = {
      page: _page,
      limit: _limit,
      sort: { createdAt: -1 },
      populate: [
        {
          path: 'questions',
          select: '_id title score',
          populate: [
            { path: 'questionAnswers', select: '_id content isCorrect' },
          ],
        },
        { path: 'user', select: '-password -quizz -quizzExam -quizizz' },
      ],
    };
    const query = q ? { $title: { $search: q } } : {};
    const quizizzs = await this.quizizzModel.paginate(
      {
        user: userId,
      },
      options,
    );
    if (!quizizzs) {
      throw new NotFoundException('Not found quizizz');
    }
    return quizizzs.docs;
  }

  /* create */
  async create(quizizz: CreateQuizizzDto): Promise<Quizizz> {
    const newQuizizz = await this.quizizzModel.create(quizizz);
    if (!newQuizizz) {
      throw new NotFoundException('Not found quizizz');
    }
    /* update id user vào question của người tạo */
    await this.userModel
      .findByIdAndUpdate(
        { _id: newQuizizz.user },
        { $addToSet: { quizizz: newQuizizz._id } },
      )
      .exec();
    /* update quizizz vào type */
    // await this.questionTypeModel.findByIdAndUpdate(
    //   { _id: newQuizizz.questionType },
    //   { $addToSet: { quizizz: newQuizizz._id } },
    // );
    /* cập nhật vào quizizz question */
    if (newQuizizz.questions.length > 0) {
      for (let question of newQuizizz.questions) {
        await this.quizizzQuestionModel
          .findByIdAndUpdate(
            { _id: question },
            { $addToSet: { quizizz: newQuizizz._id } },
          )
          .exec();
      }
    }
    return newQuizizz;
  }

  /* delete */
  async delete(id: ObjectId): Promise<{ message: string }> {
    /* tìm xem quizizz có tồn tại hay không */
    const quizizzExit = await this.quizizzModel.findOne({ _id: id }).exec();
    if (!quizizzExit) {
      throw new NotFoundException('Not found quizizz');
    }
    /* xóa id quizizz trong user đi */
    await this.userModel
      .findByIdAndUpdate(
        { _id: quizizzExit.user },
        { $pull: { quizizz: quizizzExit._id } },
      )
      .exec();
    /* xóa id quizizz trong question đi */
    if (quizizzExit.questions.length > 0) {
      for (let question of quizizzExit.questions) {
        await this.quizizzQuestionModel
          .findByIdAndUpdate({
            _id: question,
          })
          .exec();
      }
    }
    /* type */
    // await this.questionTypeModel.findByIdAndUpdate(
    //   { _id: quizizzExit.questionType },
    //   { $pull: { quizizz: quizizzExit._id } },
    // );
    const quizizz = await this.quizizzModel.findByIdAndDelete(id).exec();
    if (!quizizz) {
      throw new NotFoundException('Not found quizizz');
    }
    return { message: 'Delete success' };
  }

  /* get one */
  async getOneQuizizz(id: ObjectId): Promise<Quizizz> {
    const quizizz = await this.quizizzModel
      .findOne({ _id: id })
      .populate([
        {
          path: 'questions',
          select: '_id title score',
          populate: [
            { path: 'questionAnswers', select: '_id content isCorrect' },
          ],
        },
        { path: 'user', select: '-password -quizz -quizzExam -quizizz' },
      ])
      .exec();
    if (!quizizz) {
      throw new NotFoundException('Not found quizizz');
    }
    return quizizz;
  }

  /* update */
  async update(id: ObjectId, body: UpdateQuizizzDto): Promise<Quizizz> {
    /* tìm xem câu hỏi đó có tồn tại hay không */
    const quizizzExit = await this.quizizzModel.findOne({ _id: id }).exec();
    if (!quizizzExit) {
      throw new NotFoundException('Not found quizizz');
    }
    /* update quizizz vào type */
    // await this.questionTypeModel.findByIdAndUpdate(
    //   { _id: quizizzExit.questionType },
    //   { $pull: { quizizz: quizizzExit._id } },
    // );
    /* xóa question trong quiz đi */
    if (quizizzExit.questions.length > 0) {
      for (let question of quizizzExit.questions) {
        await this.quizizzQuestionModel
          .findByIdAndUpdate(
            { _id: question },
            { $pull: { quizizz: quizizzExit._id } },
          )
          .exec();
      }
    }
    /* update quizizz */
    const quizizz = await this.quizizzModel
      .findByIdAndUpdate({ _id: id }, body, { new: true })
      .exec();
    if (!quizizz) {
      throw new NotFoundException('Not found quizizz');
    }
    /* update quizizz vào type */
    // await this.questionTypeModel.findByIdAndUpdate(
    //   { _id: quizizz.questionType },
    //   { $addToSet: { quizizz: quizizz._id } },
    // );
    /* update question vào quizizz */
    if (quizizz.questions.length > 0) {
      for (let question of quizizz.questions) {
        await this.quizizzQuestionModel
          .findByIdAndUpdate(
            { _id: question },
            { $addToSet: { quizizz: quizizz._id } },
          )
          .exec();
      }
    }
    return quizizz;
  }
}
