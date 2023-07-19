import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { User } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginateModel } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: PaginateModel<User>,
  ) {}

  /* get all user */
  async getAllUser(_page: number, _limit: number, q: string): Promise<User[]> {
    const options = {
      page: Number(_page),
      limit: Number(_limit),
      sort: { createdAt: -1 },
    };
    const query = q
      ? {
          $or: [
            { name: { $regex: q, $options: 'i' } },
            { email: { $regex: q, $options: 'i' } },
          ],
        }
      : {};
    const users = await this.userModel.paginate(query, options);
    if (!users) {
      throw new NotFoundException('No user found');
    }
    /* loại bỏ các trường dữ liệu không cần thiết khi trả dữ liệu về */
    users.docs = users.docs.map((user) => {
      user.password = undefined;
      user.isDeleted = undefined;
      user.quizz = undefined;
      user.quizzExam = undefined;
      return user;
    });
    return users.docs;
  }

  /* create user */
  async createUser(user: CreateUserDto): Promise<User> {
    /* check email xem email có tồn tại không */
    const checkEmail = await this.userModel
      .findOne({ email: user.email })
      .exec();
    if (checkEmail) {
      throw new BadRequestException('Email already exists');
    }
    /* mã hóa password */
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);
    user.password = hashPassword;
    const newUser = await this.userModel.create(user);
    if (!newUser) {
      throw new NotFoundException('Cannot create user');
    }
    /* loại bỏ các trường dữ liệu không cần thiết khi trả dữ liệu về */
    newUser.password = undefined;
    newUser.isDeleted = undefined;
    newUser.quizz = undefined;
    newUser.quizzExam = undefined;
    return newUser;
  }

  /* get user by id */
  async getUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    /* loại bỏ các trường dữ liệu không cần thiết khi trả dữ liệu về */
    user.password = undefined;
    return user;
  }

  /* update user by id */
  async updateUserById(id: string, user: UpdateUserDto): Promise<User> {
    /* check email xem email có tồn tại không */
    const checkEmail = await this.userModel
      .findOne({ email: user.email })
      .exec();
    if (!checkEmail) {
      throw new BadRequestException('Email not exists');
    }
    const updateUser = await this.userModel
      .findByIdAndUpdate({ _id: id }, user, { new: true, runValidators: true })
      .exec();
    if (!updateUser) {
      throw new NotFoundException('User not found');
    }
    /* loại bỏ các trường dữ liệu không cần thiết khi trả dữ liệu về */
    updateUser.password = undefined;
    return updateUser;
  }

  /* delete user by id */
  async deleteUserById(id: string): Promise<{ message: string }> {
    const user = await this.userModel.findByIdAndDelete(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return { message: 'Delete user successfully' };
  }

  /* update lại isDeleted */
  async updateIsDeleted(
    id: string,
    isDeleted: boolean,
  ): Promise<{ message: string }> {
    const user = await this.userModel
      .findByIdAndUpdate({ _id: id }, { isDeleted: isDeleted })
      .exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const action = isDeleted ? 'Delete' : 'Restore';
    return { message: `${action} user successfully` };
  }

  /* update isDeletd = true */
  async softDeleteUserById(id: string): Promise<{ message: string }> {
    await this.updateIsDeleted(id, true);
    return { message: 'Soft delete user successfully' };
  }

  /* restore */
  async restoreUserById(id: string): Promise<{ message: string }> {
    await this.updateIsDeleted(id, false);
    return { message: 'Restore user successfully' };
  }
}
