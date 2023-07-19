import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { QuizizzQuestion } from 'src/quizizz-question/schema/quizizz-question.schema';
import mongoose from 'mongoose';

export enum Level {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

@Schema({
  timestamps: true,
  versionKey: false,
})
export class QuizizzQuestionLevel {
  @Prop()
  content: Level;

  @Prop()
  isDeleted: boolean;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'QuizizzQuestion' }])
  questions: QuizizzQuestion;
}

export type QuizizzQuestionLevelDocument = QuizizzQuestionLevel &
  mongoose.Document<QuizizzQuestionLevel>;

export const QuizizzQuestionLevelSchema =
  SchemaFactory.createForClass(QuizizzQuestionLevel);
