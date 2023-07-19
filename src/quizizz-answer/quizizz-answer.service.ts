import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QuizizzAnswer } from './schema/quizizz-answer.schema';
import { PaginateModel } from 'mongoose';
import { CreateQuizizzAnswerDto } from './dto/create.dto';

@Injectable()
export class QuizizzAnswerService {
  constructor(
    @InjectModel(QuizizzAnswer.name)
    private readonly model: PaginateModel<QuizizzAnswer>,
  ) {}

  /* thêm mới câu trả lời */
  async create(body: CreateQuizizzAnswerDto): Promise<QuizizzAnswer> {
    const quizizzAnswer = await this.model.create(body);
    if (!quizizzAnswer) {
      throw new NotFoundException('Không thể tạo câu trả lời');
    }
    return quizizzAnswer;
  }

  /* lấy chi tiết câu trả lời */
  async getDetail(id: string): Promise<QuizizzAnswer> {
    const quizizzAnswer = await this.model.findById(id).exec();
    if (!quizizzAnswer) {
      throw new NotFoundException('Không tìm thấy câu trả lời');
    }
    return quizizzAnswer;
  }

  /* lấy danh sách câu trả lời */
  async getList(
    _page: number,
    _limit: number,
    q: string,
  ): Promise<QuizizzAnswer[]> {
    const options = {
      page: _page,
      limit: _limit,
      sort: { createdAt: -1 },
      populate: [
        {
          path: 'quizz_question',
          select: 'title score questionLevel',
          populate: [{ path: 'questionLevel', select: 'content' }],
        },
      ],
    };
    const query = q ? [{ content: { $regex: q, $options: 'i' } }] : {};
    const quizizzAnswers = await this.model.paginate(query, options);
    if (!quizizzAnswers) {
      throw new NotFoundException('Không tìm thấy câu trả lời');
    }
    return quizizzAnswers.docs;
  }
}
