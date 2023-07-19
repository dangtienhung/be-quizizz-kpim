import { IsBoolean, IsNotEmpty } from 'class-validator';

export class BaseDto {
  code: string;

  @IsNotEmpty()
  name: string;

  questions: string[];

  isDeleted: boolean;
}
