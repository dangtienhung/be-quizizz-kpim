import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { QuestionType } from 'src/quizizz-quesstion-type/schema/question-type.schema';
import { QuizizzQuestion } from 'src/quizizz-question/schema/quizizz-question.schema';
import { User } from 'src/user/schema/user.schema';
import mongoose from 'mongoose';

enum StatusQuizizz {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DRAFT = 'draft',
}

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Quizizz {
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

  @Prop({ type: String, default: StatusQuizizz.ACTIVE })
  status: StatusQuizizz;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;
}

export type QuizizzDocument = Quizizz & mongoose.Document<Quizizz>;

export const QuizizzSchema = SchemaFactory.createForClass(Quizizz);
