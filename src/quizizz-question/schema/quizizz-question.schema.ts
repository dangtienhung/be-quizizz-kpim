import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { QuestionType } from 'src/quizizz-quesstion-type/schema/question-type.schema';
import { QuizizzAnswer } from 'src/quizizz-answer/schema/quizizz-answer.schema';
import { QuizizzQuestionGroup } from 'src/quizizz-question-group/schema/quizizz-question-group.schema';
import { QuizizzQuestionLevel } from 'src/quizizz-question-level/schema/quizizz-question-level.schema';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class QuizizzQuestion {
  @Prop()
  title: string;

  @Prop({ default: 0 })
  score: number;

  @Prop({ default: true })
  active: boolean;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'QuizizzQuestionType' })
  questionType: QuestionType;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'QuizizzAnswer' }])
  questionAnswers: QuizizzAnswer[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QuizizzQuestionLevel',
    required: true,
  })
  questionLevel: QuizizzQuestionLevel;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'QuizizzQuestionGroup' })
  questionGroup: QuizizzQuestionGroup;

  @Prop({ type: Number, default: 0 })
  timer: number;
}

export type QuizizzQuestionDocument = QuizizzQuestion &
  mongoose.Document<QuizizzQuestion>;

export const QuizizzQuestionSchema =
  SchemaFactory.createForClass(QuizizzQuestion);
