import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

import { ObjectId } from 'mongoose';

export class BaseDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsBoolean()
  isCorrect: boolean = false;

  @IsNotEmpty()
  quizz_question: ObjectId;
}
