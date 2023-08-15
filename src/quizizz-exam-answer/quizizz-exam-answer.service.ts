import { QuizizzAnswerService } from 'src/quizizz-answer/quizizz-answer.service';
import { Injectable } from '@nestjs/common';
import { QuizizzExamAnswer } from './schema/quizizz-exam-answer.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateQuizizzExamAnswerDto } from './dto/create.dto';

@Injectable()
export class QuizizzExamAnswerService {
  constructor(
    @InjectModel(QuizizzExamAnswer.name)
    private readonly quizizzExamAnswer: Model<QuizizzExamAnswer>,
    private readonly quizizzAnswerService: QuizizzAnswerService,
  ) {}

  /* create data */
  async createAnswer(answerData: CreateQuizizzExamAnswerDto) {
    const newAnswer = new this.quizizzExamAnswer(answerData);
    return await newAnswer.save();
  }

  /* check answer */
  async checkAnswer(answerData: { questionId: ObjectId; answerId: string }) {
    const answer = await this.quizizzAnswerService.getDetail(
      answerData.answerId,
    );
    if (answer.isCorrect === true) {
      return { result: true, answer };
    }
    /* không sẽ tìm ra đáp án đúng để trả về */
    const correctAnswer = await this.quizizzAnswerService.getCorrectAnswer(
      answer.quizz_question.toString(),
    );
    return { result: false, answer: correctAnswer };
  }
}
