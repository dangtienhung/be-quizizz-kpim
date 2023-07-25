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
  active: boolean = true;

  @IsBoolean()
  isDeleted: boolean = false;

  @ArrayNotEmpty()
  @IsArray()
  answers: string[];
}
