import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class QuizizzExamMutiple {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  thumbnail: string;

  @Prop()
  players: [];

  @Prop()
  questions: [];
}
