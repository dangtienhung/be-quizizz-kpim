import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { ObjectId } from 'mongoose';

import { QuizizzExam } from 'src/quizizz-exam/schema/quizizz-exam.schema';
import { QuizizzExamAnswer } from 'src/quizizz-exam-answer/schema/quizizz-exam-answer.schema';
import { QuizizzQuestion } from 'src/quizizz-question/schema/quizizz-question.schema';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class QuizizzExamQuestion {
  // @Prop()
  // title: string;

  // @Prop()
  // score: number;

  // @Prop({ default: true })
  // active: boolean;

  // @Prop({ default: false })
  // isDeleted: boolean;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'QuizizzQuestion' })
  questions: QuizizzQuestion[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'QuizizzExam' })
  questionExam: QuizizzExam;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'QuizizzExamAnswer' }])
  answers: QuizizzExamAnswer[];
}

export type QuizizzExamQuestionDocument = QuizizzExamQuestion &
  mongoose.Document<QuizizzExamQuestion>;

export const QuizizzExamQuestionSchema =
  SchemaFactory.createForClass(QuizizzExamQuestion);
