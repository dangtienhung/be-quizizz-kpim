import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

import { ObjectId } from 'mongoose';
import { Type } from 'class-transformer';

enum StatusQuizizz {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DRAFT = 'draft',
}

class QuizizzQuestionDto {
  @IsString()
  @IsNotEmpty()
  readonly _id: string;
}

class UserDto {
  @IsString()
  @IsNotEmpty()
  readonly _id: string;
}

class QuestionTypeDto {
  @IsString()
  @IsNotEmpty()
  readonly _id: string;
}

export abstract class BaseDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  readonly description: string;

  slug: string;

  @IsArray()
  @ArrayNotEmpty()
  readonly questions: QuizizzQuestionDto[];

  @IsNotEmpty()
  @Type(() => UserDto)
  readonly user: ObjectId;

  @Type(() => QuestionTypeDto)
  readonly questionType: QuestionTypeDto;

  @IsEnum(StatusQuizizz)
  readonly status: StatusQuizizz = StatusQuizizz.ACTIVE;

  @IsBoolean()
  readonly isDeleted: boolean = false;
}
