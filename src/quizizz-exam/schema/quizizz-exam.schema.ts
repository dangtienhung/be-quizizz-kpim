import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { QuestionType } from 'src/quizizz-quesstion-type/schema/question-type.schema';
import { QuizizzQuestion } from 'src/quizizz-question/schema/quizizz-question.schema';
import { User } from 'src/user/schema/user.schema';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class QuizizzExam {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  slug: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'QuizizzQuestion' }])
  questions: QuizizzQuestion[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'QuestionType' })
  questionType: QuestionType;

  @Prop({ type: Boolean, default: true })
  isPublic: boolean;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;

  @Prop({ type: Date, default: Date.now() })
  startDate: Date;

  @Prop({ type: Date, default: Date.now() })
  endDate: Date;

  @Prop({ type: Number, default: 0 })
  time: number;

  @Prop({ type: Number, default: 0 })
  totalQuestion: number;

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
