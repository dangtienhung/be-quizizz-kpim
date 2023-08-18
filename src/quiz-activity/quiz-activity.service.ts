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
    console.log(
      '🚀 ~ file: quiz-activity.service.ts:14 ~ QuizActivityService ~ create ~ quizActivity:',
      quizActivity,
    );
    const newQuizActivity = await this.quizActivityModel.create(quizActivity);
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
      .exec();
    return quizActivities;
  }
}
