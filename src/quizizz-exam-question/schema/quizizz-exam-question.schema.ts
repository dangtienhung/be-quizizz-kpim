import { Prop, Schema } from '@nestjs/mongoose';

import { QuizizzExam } from 'src/quizizz-exam/schema/quizizz-exam.schema';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class QuizizzExamQuestion {
  @Prop()
  title: string;

  @Prop()
  score: number;

  @Prop({ default: true })
  active: boolean;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'QuizizzExam' })
  questionExam: QuizizzExam;
}
