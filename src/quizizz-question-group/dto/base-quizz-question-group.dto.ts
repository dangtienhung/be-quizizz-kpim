import { IsNotEmpty, IsString } from 'class-validator';

export class BaseQuizizzQuestionGroupDto {
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  questions: string[];
}
