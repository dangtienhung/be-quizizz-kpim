import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { QuizizzAnswer } from 'src/quizizz-answer/schema/quizizz-answer.schema';
import { QuizizzExam } from 'src/quizizz-exam/schema/quizizz-exam.schema';
import { QuizizzQuestion } from './../../quizizz-question/schema/quizizz-question.schema';
import { User } from 'src/user/schema/user.schema';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Answer {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'QuizizzAnswer' })
  answerSelect: QuizizzAnswer;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'QuizizzQuestion' })
  question: QuizizzQuestion;

  @Prop()
  isCorrect: boolean;

  @Prop({ default: 0 })
  score: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'QuizizzAnswer' })
  answerResult: QuizizzAnswer;
}

@Schema({
  timestamps: true,
  versionKey: false,
})
export class QuizActivity {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'QuizizzExam' })
  quizizzExamId: QuizizzExam;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop([Answer])
  answers: Answer[];

  @Prop({ type: Boolean, default: true })
  isCompleted: boolean;

  @Prop({ type: Number, default: 0 })
  score: number;
}

export type QuizActivityDocument = QuizActivity &
  mongoose.Document<QuizActivity>;

export const QuizActivitySchema = SchemaFactory.createForClass(QuizActivity);
