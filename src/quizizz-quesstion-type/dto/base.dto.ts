import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

export class BaseDto {
  code: string;

  @IsNotEmpty()
  name: string;

  questions: ObjectId[];

  isDeleted: boolean;
}
