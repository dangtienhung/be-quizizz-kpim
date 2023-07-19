import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

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
  questions: string[];

  @Prop({ default: false })
  isDeleted: boolean;
}

export type QuestionTypeDocument = QuestionType & Document<QuestionType>;

export const QuestionTypeSchema = SchemaFactory.createForClass(QuestionType);
