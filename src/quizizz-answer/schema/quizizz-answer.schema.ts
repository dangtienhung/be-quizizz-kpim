import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { QuizizzQuestion } from './../../quizizz-question/schema/quizizz-question.schema';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class QuizizzAnswer {
  @Prop()
  content: string;

  @Prop({ default: false })
  isCorrect: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'QuizizzQuestion' })
  quizz_question: QuizizzQuestion;
}

export type QuizizzAnswerDocument = QuizizzAnswer &
  mongoose.Document<QuizizzAnswer>;

export const QuizizzAnswerSchema = SchemaFactory.createForClass(QuizizzAnswer);
