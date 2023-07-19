import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

import { QuizizzQuestion } from 'src/quizizz-question/schema/quizizz-question.schema';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class QuestionType {
  @Prop()
  code: string;

  @Prop({ required: true })
  name: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'QuizizzQuestion' }])
  questions: QuizizzQuestion[];

  @Prop({ default: false })
  isDeleted: boolean;
}

export type QuestionTypeDocument = QuestionType & Document<QuestionType>;

export const QuestionTypeSchema = SchemaFactory.createForClass(QuestionType);
