import { Injectable } from '@nestjs/common';
import { QuizizzExamAnswer } from './schema/quizizz-exam-answer.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateQuizizzExamAnswerDto } from './dto/create.dto';

@Injectable()
export class QuizizzExamAnswerService {
  constructor(
    @InjectModel('QuizizzExamAnswer')
    private readonly quizizzExamAnswer: Model<QuizizzExamAnswer>,
  ) {}

  /* create data */
  async createAnswer(answerData: CreateQuizizzExamAnswerDto) {
    const newAnswer = new this.quizizzExamAnswer(answerData);
    return await newAnswer.save();
  }

  /* check answer */
  async checkAnswer(answerData: {
    questionId: ObjectId;
    answerId: ObjectId[];
  }) {
    const answer = await this.quizizzExamAnswer.findOne(answerData);
    if (answer) {
      return true;
    }
    return false;
  }
}
