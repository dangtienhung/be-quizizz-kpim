import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
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
  @IsString()
  code: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  // @IsNotEmpty()
  thumbnail: string;

  @ApiProperty()
  @IsArray()
  user: ObjectId[]; // Change to string ID of User

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  questions: ObjectId[]; // Change to string ID of QuizizzExamQuestion

  @ApiProperty()
  @IsBoolean()
  isPublic = true;

  @ApiProperty()
  @IsBoolean()
  isDeleted = false;

  @ApiProperty()
  startDate: string;

  @ApiProperty()
  endDate: string;
}
