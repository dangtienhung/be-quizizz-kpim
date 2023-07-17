import { BaseUserDto } from './base-user.dto';
import { Expose } from 'class-transformer';

export class CreateUserDto extends BaseUserDto {
  @Expose()
  name: string;
}
