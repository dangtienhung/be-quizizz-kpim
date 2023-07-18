import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class QuizizzQuestionGroup {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  name: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'QuizizzQuestion' }])
  questions: string[];

  @Prop({ default: false })
  isDeleted: boolean;
}

export type QuizizzQuestionGroupDocument = QuizizzQuestionGroup &
  Document<QuizizzQuestionGroup>;

export const QuizizzQuestionGroupSchema =
  SchemaFactory.createForClass(QuizizzQuestionGroup);
