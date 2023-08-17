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
import { QuestionType } from 'src/quizizz-quesstion-type/schema/question-type.schema';
import { QuizizzQuestion } from 'src/quizizz-question/schema/quizizz-question.schema';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: PaginateModel<User>, // @InjectModel(QuestionType.name) // private questionTypeModel: PaginateModel<QuestionType>, // @InjectModel(QuizizzQuestion.name) // private quizizzQuestionModel: PaginateModel<QuizizzQuestion>,
  ) {}

  /* tạo ra token */
  private generateToken(userId: string) {
    const token = jwt.sign({ _id: userId }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    return token;
  }

  /* get all user */
  async getAllUser(_page: number, _limit: number, q: string): Promise<User[]> {
    const options = {
      page: Number(_page),
      limit: Number(_limit),
      sort: { createdAt: -1 },
      populate: [
        {
          path: 'quizizz',
          select: '-user',
          populate: [
            { path: 'questionType', select: 'code name' },
            { path: 'questions', select: 'title score' },
          ],
        },
      ],
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
    /* delete quizizz mà người dùng đã tạo */
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

  /* login */
  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{ data: User; accessToken: string }> {
    const user = await this.userModel.findOne({ email: email }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      throw new BadRequestException('Password is incorrect');
    }
    if (user && checkPassword) {
      /* loại bỏ các trường dữ liệu không cần thiết khi trả dữ liệu về */
      user.password = undefined;
      /* tạo ra token */
      const accessToken = this.generateToken(user._id.toString());
      return { data: user, accessToken };
    }
  }

  /* thêm phòng chơi vào quizExam */
  async addQuizizzToUser({ roomId, useId }: { roomId: string; useId: string }) {
    const useExits = await this.userModel.findById(useId).exec();
    // nếu mà không thấy ngưởi dùng thì báo lỗi
    if (!useExits) {
      throw new NotFoundException('User not found');
    }
    // Nếu người dùng tồn tại, hãy kiểm tra xem idRoom đã có trong quizzExam của người dùng chưa
    const checkRoom = await this.userModel.find({ quizzExam: roomId }).exec();
    if (checkRoom && checkRoom.length === 0) {
      /* thêm vào quizExam của người dùng */
      await this.userModel
        .findByIdAndUpdate({ _id: useId }, { $push: { quizzExam: roomId } })
        .exec();
    }
    return { message: 'Add quizizz to user successfully' };
  }
}
