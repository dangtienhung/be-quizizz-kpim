import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

import { Quizizz } from 'src/quizizz/schema/quizizz.schema';
import { QuizizzExam } from 'src/quizizz-exam/schema/quizizz-exam.schema';

const enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

enum Role {
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
}

@Schema({
  timestamps: true,
  versionKey: false,
})
export class User {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String, default: '' })
  nameInGame: string;

  @Prop({ type: Number, default: 0 })
  scores: number;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: Role.STUDENT, enum: Role, type: String })
  role: Role;

  @Prop({ default: Status.ACTIVE })
  status: Status;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Quizizz' }])
  quizizz: Quizizz[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'QuizizzExam' }])
  quizzExam: QuizizzExam[];

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;

  @Prop({ type: String })
  phone: string;

  @Prop({ type: String })
  address: string;

  @Prop({ type: String })
  avatar: string;

  @Prop({ type: String })
  birthday: string;
}

export type UserDocument = User & Document<User>;

export const UserSchema = SchemaFactory.createForClass(User);
