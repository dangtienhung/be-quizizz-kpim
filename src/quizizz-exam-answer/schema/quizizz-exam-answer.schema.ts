import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { ObjectId } from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class QuizizzExamAnswer {
  @Prop()
  userId: string;

  @Prop()
  quizizzExamQuestionId: string;

  @Prop()
  quizizzExamQuestionAnswerId: string[];
}

export type QuizizzExamAnswerDocument = QuizizzExamAnswer &
  mongoose.Document<QuizizzExamAnswer>;

export const QuizizzExamAnswerSchema =
  SchemaFactory.createForClass(QuizizzExamAnswer);
