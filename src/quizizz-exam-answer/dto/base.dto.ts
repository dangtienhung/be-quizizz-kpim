import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

import { ObjectId } from 'mongoose';

export class BaseDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsBoolean()
  @IsNotEmpty()
  isCorrect: boolean = false;

  @IsBoolean()
  active: boolean = true;

  @IsBoolean()
  isDeleted: boolean = false;

  @IsString()
  @IsNotEmpty()
  answerQuestion: ObjectId;
}
