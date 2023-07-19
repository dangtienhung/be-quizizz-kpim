import { IsNotEmpty } from 'class-validator';

export abstract class BaseDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  score: number;

  active: boolean;

  isDeleted: boolean;

  @IsNotEmpty()
  questionType: string;

  @IsNotEmpty()
  questionAnswers: string[];

  @IsNotEmpty()
  questionLevel: string;

  @IsNotEmpty()
  questionGroup: string;
}
