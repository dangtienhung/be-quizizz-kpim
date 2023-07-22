import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsString,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class BaseDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  questions: ObjectId[]; // Change to array of string IDs of QuizizzQuestion

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  user: ObjectId[]; // Change to string ID of User

  @ApiProperty()
  questionType: ObjectId; // Change to string ID of QuestionType

  @ApiProperty()
  @IsBoolean()
  isPublic: boolean = true;

  @ApiProperty()
  @IsBoolean()
  isDeleted: boolean = false;

  @ApiProperty()
  startDate: string;

  @ApiProperty()
  endDate: string;

  @ApiProperty()
  @IsNumber()
  plays: number = null;

  @ApiProperty()
  @IsNumber()
  totalPoint: number = 0;

  @ApiProperty()
  @IsNumber()
  totalStudent: number = 0;

  @ApiProperty()
  @IsNumber()
  totalStudentDone: number = 0;

  @ApiProperty()
  @IsNumber()
  totalStudentNotDone: number = 0;

  @ApiProperty()
  @IsNumber()
  totalStudentDoing: number = 0;

  @ApiProperty()
  @IsNumber()
  totalStudentNotDoing: number = 0;
}
