import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

import { ObjectId } from 'mongoose';

export abstract class BaseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  score = 0;

  active: boolean;

  isDeleted: boolean;

  @IsString()
  @IsNotEmpty()
  quizizz: ObjectId;

  // @IsNotEmpty()
  // questionType: ObjectId;

  // @ValidateNested({ each: true })
  // @Type(() => CreateQuizizzAnswerDto)
  @IsArray()
  @ArrayNotEmpty()
  questionAnswers: {
    content: {
      type: string;
    };
    isCorrect: {
      type: boolean;
    };
  }[];

  // @IsNotEmpty()
  // questionLevel: ObjectId;

  // @IsNotEmpty()
  // questionGroup: Object;
}
