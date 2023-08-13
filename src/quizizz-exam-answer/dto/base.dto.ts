import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsString,
} from 'class-validator';

import { ObjectId } from 'mongoose';

export class BaseDto {
  @IsString()
  @IsNotEmpty()
  userId: ObjectId;

  @IsString()
  @IsNotEmpty()
  quizizzExamQuestionId: ObjectId;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  quizizzExamQuestionAnswerId: ObjectId[];
}
