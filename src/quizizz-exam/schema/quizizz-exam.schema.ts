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
  thumbnail: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
  user: User[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'QuizizzExamQuestion' }])
  questions: QuizizzExamQuestion[];

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
}

export type QuizizzExamDocument = QuizizzExam & mongoose.Document<QuizizzExam>;

export const QuizizzExamSchema = SchemaFactory.createForClass(QuizizzExam);
