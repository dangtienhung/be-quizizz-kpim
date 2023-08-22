import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QuizActivity } from './schemas/quiz-activity.schemas';
import { PaginateModel } from 'mongoose';
import { CreateQuizizzActivityDto } from './dto/create.dto';

@Injectable()
export class QuizActivityService {
  constructor(
    @InjectModel(QuizActivity.name)
    private quizActivityModel: PaginateModel<QuizActivity>,
  ) {}

  /* tạo ra quizizz mà người dùng đã chơi */
  async create(quizActivity: CreateQuizizzActivityDto): Promise<QuizActivity> {
    const newQuizActivity = (
      await this.quizActivityModel.create(quizActivity)
    ).populate([
      {
        path: 'quizizzExamId',
        select: 'questions',
        populate: [
          {
            path: 'questions',
            select: 'questions',
            populate: [
              {
                path: 'questions',
                select: 'title score',
                populate: [
                  { path: 'questionAnswers', select: 'content isCorrect' },
                ],
              },
            ],
          },
        ],
      },
      { path: 'userId', select: 'name avatar' },
      { path: 'answers.answerSelect', select: 'content isCorrect' },
      { path: 'answers.answerResult', select: 'content isCorrect' },
      {
        path: 'answers.question',
        select: 'title',
        populate: [{ path: 'questionAnswers', select: 'content isCorrect' }],
      },
    ]);
    return newQuizActivity;
  }

  /* lấy ra các quizizz activity mà người dùng đã chơi 1 phòng chơi */
  async findAll({
    useId,
    roomId,
  }: {
    useId: string;
    roomId: string;
  }): Promise<QuizActivity[]> {
    const quizActivities = await this.quizActivityModel
      .find({
        userId: useId,
        quizizzExamId: roomId,
      })
      .populate([
        {
          path: 'quizizzExamId',
          select: 'questions',
          populate: [
            {
              path: 'questions',
              select: 'questions',
              populate: [
                {
                  path: 'questions',
                  select: 'title score',
                  populate: [
                    { path: 'questionAnswers', select: 'content isCorrect' },
                  ],
                },
              ],
            },
          ],
        },
        { path: 'userId', select: 'name avatar' },
        { path: 'answers.answerSelect', select: 'content isCorrect' },
        { path: 'answers.answerResult', select: 'content isCorrect' },
        {
          path: 'answers.question',
          select: 'title',
          populate: [{ path: 'questionAnswers', select: 'content isCorrect' }],
        },
      ])
      .exec();
    return quizActivities;
  }

  /* lấy ra 1 bài quizizz activity */
  async findOne(id: string): Promise<QuizActivity> {
    const quizActivity = await this.quizActivityModel
      .findById(id)
      .populate([
        {
          path: 'quizizzExamId',
          select: 'questions',
          populate: [
            {
              path: 'questions',
              select: 'questions',
              populate: [
                {
                  path: 'questions',
                  select: 'title score',
                  populate: [
                    { path: 'questionAnswers', select: 'content isCorrect' },
                  ],
                },
              ],
            },
          ],
        },
        { path: 'userId', select: 'name avatar' },
        { path: 'answers.answerSelect', select: 'content isCorrect' },
        { path: 'answers.answerResult', select: 'content isCorrect' },
        {
          path: 'answers.question',
          select: 'title',
          populate: [{ path: 'questionAnswers', select: 'content isCorrect' }],
        },
      ])
      .exec();
    if (!quizActivity) {
      throw new Error('QuizActivity not found');
    }
    return quizActivity;
  }

  /* lấy ra tất cả các bài quiziz mà người dùng đã chơi */
  async findAllQuizizzActivityByUserId({
    userId,
    _page = 1,
    _limit = 10,
  }): Promise<QuizActivity[]> {
    const options = {
      page: _page,
      limit: _limit,
      sort: { createdAt: -1 },
      populate: [
        {
          path: 'quizizzExamId',
          select: 'title questions',
          populate: [
            {
              path: 'questions',
              select: 'questions',
              populate: [
                {
                  path: 'questions',
                  select: 'title score',
                  populate: [
                    { path: 'questionAnswers', select: 'content isCorrect' },
                  ],
                },
              ],
            },
          ],
        },
        { path: 'userId', select: 'name avatar' },
        { path: 'answers.answerSelect', select: 'content isCorrect' },
        { path: 'answers.answerResult', select: 'content isCorrect' },
        {
          path: 'answers.question',
          select: 'title',
          populate: [{ path: 'questionAnswers', select: 'content isCorrect' }],
        },
      ],
    };
    const quizizzActivities = await this.quizActivityModel.paginate(
      { userId },
      options,
    );
    if (!quizizzActivities) {
      throw new Error('QuizActivity not found');
    }
    return quizizzActivities.docs;
  }

  /* lấy ra toàn bộ số điểm của những người chơi khác khi mà chơi cùng phòng quizzExamId đó */
  async findAllScoreByQuizizzExamId(
    roomId: string,
    userId: string,
  ): Promise<any> {
    const quizizzActivities = await this.quizActivityModel
      .find({ quizizzExamId: roomId })
      .exec();
    if (!quizizzActivities) {
      throw new Error('QuizActivity not found');
    }
    /* lọc ra những userId !== userId gửi lên */
    const scores = quizizzActivities.filter((quizizzActivity) => {
      return quizizzActivity.userId.toString() !== userId.toString();
    });
    return scores;
  }
}
