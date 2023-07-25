import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { QuizizzExamQuestion } from 'src/quizizz-exam-question/schema/quizizz-exam-question.schema';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class QuizizzExamAnswer {
  @Prop()
  content: string;

  @Prop()
  isCorrect: boolean;

  @Prop({ default: true })
  active: boolean;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'QuizizzExamQuestion' })
  answerQuestion: QuizizzExamQuestion;
}

export type QuizizzExamAnswerDocument = QuizizzExamAnswer &
  mongoose.Document<QuizizzExamAnswer>;

export const QuizizzExamAnswerSchema =
  SchemaFactory.createForClass(QuizizzExamAnswer);
