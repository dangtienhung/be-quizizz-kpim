import { IsBoolean, IsDateString, IsNumber, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class BaseDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  slug: string;

  @ApiProperty()
  questions: ObjectId[]; // Change to array of string IDs of QuizizzQuestion

  @ApiProperty()
  user: ObjectId; // Change to string ID of User

  @ApiProperty()
  questionType: ObjectId; // Change to string ID of QuestionType

  @ApiProperty()
  @IsBoolean()
  isPublic: boolean;

  @ApiProperty()
  @IsBoolean()
  isDeleted: boolean;

  @ApiProperty()
  @IsDateString()
  startDate: Date;

  @ApiProperty()
  @IsDateString()
  endDate: Date;

  @ApiProperty()
  @IsNumber()
  time: number;

  @ApiProperty()
  @IsNumber()
  totalQuestion: number;

  @ApiProperty()
  @IsNumber()
  totalPoint: number;

  @ApiProperty()
  @IsNumber()
  totalStudent: number;

  @ApiProperty()
  @IsNumber()
  totalStudentDone: number;

  @ApiProperty()
  @IsNumber()
  totalStudentNotDone: number;

  @ApiProperty()
  @IsNumber()
  totalStudentDoing: number;

  @ApiProperty()
  @IsNumber()
  totalStudentNotDoing: number;
}
