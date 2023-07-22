import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { QuestionType } from 'src/quizizz-quesstion-type/schema/question-type.schema';
import { Quizizz } from 'src/quizizz/schema/quizizz.schema';
import { QuizizzExamQuestion } from 'src/quizizz-exam-question/schema/quizizz-exam-question.schema';
import { User } from 'src/user/schema/user.schema';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class QuizizzExam {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  slug: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Quizizz' }])
  questions: Quizizz[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
  user: User[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'QuestionType' })
  questionType: QuestionType;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'QuizizzExamQuestion' })
  questionExam: QuizizzExamQuestion;

  @Prop({ type: Boolean, default: true })
  isPublic: boolean;

  @Prop({ type: Number })
  plays: number = null;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;

  @Prop({ type: Date, default: Date.now(), required: true })
  startDate: Date;

  @Prop({ type: Date, default: Date.now(), required: true })
  endDate: Date;

  @Prop({ type: Number, default: 0 })
  totalPoint: number;

  @Prop({ type: Number, default: 0 })
  totalStudent: number;

  @Prop({ type: Number, default: 0 })
  totalStudentDone: number;

  @Prop({ type: Number, default: 0 })
  totalStudentNotDone: number;

  @Prop({ type: Number, default: 0 })
  totalStudentDoing: number;

  @Prop({ type: Number, default: 0 })
  totalStudentNotDoing: number;
}

export type QuizizzExamDocument = QuizizzExam & mongoose.Document<QuizizzExam>;

export const QuizizzExamSchema = SchemaFactory.createForClass(QuizizzExam);
