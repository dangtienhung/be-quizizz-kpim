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
        { path: 'user', select: 'name email avatar' },
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
    /* tạo ra 1 mã trò chơi gồm 6 chữ số ngẫu nhiên */
    const code = Math.floor(100000 + Math.random() * 900000);
    quizizzExam.code = code.toString();
    const newQuizizzExam = await this.quizizzExamModel.create(quizizzExam);
    if (!newQuizizzExam) {
      throw new NotFoundException('Not found quizizz exam');
    }
    console.log(
      '🚀 ~ file: quizizz-exam.service.ts:58 ~ QuizizzExamService ~ create ~ newQuizizzExam:',
      newQuizizzExam,
    );
    console.log(quizizzExam.questions[0]);
    await this.quizizzModel
      .findByIdAndUpdate(
        { _id: quizizzExam.questions[0] },
        { title: newQuizizzExam.title },
        { new: true },
      )
      .exec();
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

  async getOne(id: string): Promise<QuizizzExam> {
    const quizizzExam = await this.quizizzExamModel
      .findById(id)
      .populate([
        { path: 'user', select: 'name email avatar' },
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
        { path: 'players', select: 'name avatar nameInGame' },
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

  /* tìm ra quiziz exam bằng id questions */
  async getQuizizzExamByQuestionId(id: string): Promise<any> {
    const quizizzExam = await this.quizizzExamModel
      .findOne({
        questions: id,
      })
      .populate([
        { path: 'user', select: 'name email avatar' },
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

  /* tìm ra quizizz exam bằng code */
  async getCodeExam(code: string): Promise<any> {
    const quizizzExam = await this.quizizzExamModel
      .findOne({
        code: code,
      })
      .populate([
        { path: 'user', select: 'name email avatar' },
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

  /* thêm idPlayer to players */
  async addPlayer(roomId: string, idPlayer: string): Promise<any> {
    const quizizzExam = await this.quizizzExamModel
      .findById({ _id: roomId })
      .exec();
    if (!quizizzExam) {
      throw new NotFoundException('Not found quizizz exam');
    }
    const result = await this.quizizzExamModel.findByIdAndUpdate(
      { _id: quizizzExam._id },
      {
        $addToSet: { players: idPlayer },
      },
    );
    return result;
  }

  /* gỡ idPlayer ra khỏi players */
  async removePlayer(roomId: string, idPlayer: string) {
    const quizizzExam = await this.quizizzExamModel
      .findById({ _id: roomId })
      .exec();
    if (!quizizzExam) {
      throw new NotFoundException('Not found quizizz exam');
    }
    for (let i = 0; i < quizizzExam.players.length; i++) {
      if (quizizzExam.players[i].toString() === idPlayer) {
        await this.quizizzExamModel.findByIdAndUpdate(
          { _id: quizizzExam._id },
          { $pull: { players: idPlayer } },
        );
      }
    }
    return quizizzExam;
  }

  /* xét danh sách players thành 0 */
  async resetPlayers(roomId: string) {
    const quizizzExam = await this.quizizzExamModel
      .findById({ _id: roomId })
      .exec();
    if (!quizizzExam) {
      throw new NotFoundException('Not found quizizz exam');
    }
    await this.quizizzExamModel.findByIdAndUpdate(
      { _id: quizizzExam._id },
      { $set: { players: [] } },
    );
    return quizizzExam;
  }
}
