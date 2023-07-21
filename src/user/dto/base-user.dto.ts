import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

export class BaseUserDto {
  name: string;

  slug: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  role: string;

  status: string;

  quizizz: ObjectId[];

  quizzExam: ObjectId[];

  isDeleted: boolean;

  phone: string;

  address: string;

  avatar: string;

  birthday: string;
}
