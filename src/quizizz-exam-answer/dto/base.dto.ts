import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

import { ObjectId } from 'mongoose';

export class BaseDto {
  @IsString()
  @IsNotEmpty()
  userId: ObjectId;

  @IsString()
  @IsNotEmpty()
  roomId: string;

  @IsString()
  @IsNotEmpty()
  quizizzExamQuestionId: ObjectId;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  quizizzExamQuestionAnswerId: string;

  @IsNumber()
  @IsNotEmpty()
  score: number;
}
