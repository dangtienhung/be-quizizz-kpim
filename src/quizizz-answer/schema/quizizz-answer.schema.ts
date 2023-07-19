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

  @Prop()
  isCorrect: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'QuizizzQuestion' })
  question: QuizizzQuestion;

  @Prop({ default: true })
  active: boolean;

  @Prop({ default: false })
  isDeleted: boolean;
}

export type QuizizzAnswerDocument = QuizizzAnswer &
  mongoose.Document<QuizizzAnswer>;

export const QuizizzAnswerSchema = SchemaFactory.createForClass(QuizizzAnswer);
