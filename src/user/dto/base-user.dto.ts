import { IsNotEmpty } from 'class-validator';

export class BaseUserDto {
  name: string;

  slug: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  role: string;

  status: string;

  quizz: string[];

  quizzExam: string[];

  isDeleted: boolean;

  phone: string;

  address: string;

  avatar: string;

  birthday: string;
}
