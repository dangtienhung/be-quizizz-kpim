import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class BaseDto {
  @IsNotEmpty()
  title: string;

  @IsNumber()
  score: number;

  @IsBoolean()
  active = true;

  @IsBoolean()
  isDeleted = false;

  @ArrayNotEmpty()
  @IsArray()
  answers: string[];
}
