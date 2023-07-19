import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { QuestionType } from 'src/quizizz-quesstion-type/schema/question-type.schema';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class QuizizzQuestion {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop({ default: 0 })
  score: number;

  @Prop({ default: true })
  active: boolean;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'QuizizzQuestionType' })
  questionType: QuestionType;

  @Prop([
    { type: mongoose.Schema.Types.ObjectId, ref: 'QuizizzQuestionAnswer' },
  ])
  questionAnswers: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'QuizizzQuestionLevel' })
  questionLevel: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'QuizizzQuestionGroup' })
  questionGroup: string;
}

export type QuizizzQuestionDocument = QuizizzQuestion &
  mongoose.Document<QuizizzQuestion>;

export const QuizizzQuestionSchema =
  SchemaFactory.createForClass(QuizizzQuestion);
