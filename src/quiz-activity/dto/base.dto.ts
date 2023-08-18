import { IsArray, IsNotEmpty } from 'class-validator';

export class BaseDto {
  @IsNotEmpty()
  quizizzExamId: string;

  @IsNotEmpty()
  userId: string;

  @IsArray()
  @IsArray()
  @IsNotEmpty()
  answers: {
    answerSelect: string;
    question: string;
    isCorrect: boolean;
    score: number;
    answerResult: string;
  }[];
}
