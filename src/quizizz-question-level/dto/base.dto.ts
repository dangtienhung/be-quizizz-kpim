import { IsNotEmpty, IsString } from 'class-validator';

import { ObjectId } from 'mongoose';

export class BaseDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  active: boolean;

  isDeleted: boolean;

  quizz_question: ObjectId;
}
