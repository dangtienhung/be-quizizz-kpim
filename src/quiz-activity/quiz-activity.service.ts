import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QuizActivity } from './schemas/quiz-activity.schemas';
import { Model } from 'mongoose';
import { CreateQuizizzActivityDto } from './dto/create.dto';

@Injectable()
export class QuizActivityService {
  constructor(
    @InjectModel(QuizActivity.name)
    private quizActivityModel: Model<QuizActivity>,
  ) {}

  async create(quizActivity: CreateQuizizzActivityDto): Promise<QuizActivity> {
    const newQuizActivity = (
      await this.quizActivityModel.create(quizActivity)
    ).populate([
      { path: 'quizizzExamId', select: 'title startDate endDate' },
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
        { path: 'quizizzExamId', select: 'title startDate endDate' },
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
}
