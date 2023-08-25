import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  Patch,
} from '@nestjs/common';

import { User } from './schema/user.schema';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { ObjectId } from 'mongoose';
@ApiTags('Authentication & Authorization')
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /* get all user */
  @Get()
  async getAllUsers(
    @Query('_page') _page = 1,
    @Query('_limit') _limit = 10,
    @Query('q') q = '',
  ): Promise<User[]> {
    return await this.userService.getAllUser(_page, _limit, q);
  }

  /* create user */
  @Post('create')
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    /* create avatar */
    const avatar = `https://api.multiavatar.com/${user.name}.png`;
    user.avatar = avatar;
    return await this.userService.createUser(user);
  }

  /* get user by id */
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return await this.userService.getUserById(id);
  }

  /* update user by id */
  @Put('edit/:id')
  async updateUserById(@Body() user: UpdateUserDto, @Param('id') id: string) {
    return await this.userService.updateUserById(id, user);
  }

  /* delete user by id */
  @Delete(':id')
  async deleteUserById(@Param('id') id: string) {
    return await this.userService.deleteUserById(id);
  }

  /* xóa mềm user */
  @Put('soft-delete/:id')
  async softDeleteUserById(@Param('id') id: string) {
    return await this.userService.softDeleteUserById(id);
  }

  /* khôi phục user */
  @Put('restore/:id')
  async restoreUserById(@Param('id') id: string) {
    return await this.userService.restoreUserById(id);
  }

  /* đăng nhập */
  @Post('login')
  async login(
    @Body() user: LoginUserDto,
  ): Promise<{ data: User; accessToken: string }> {
    return await this.userService.login(user);
  }

  /* cập nhật tên người trong trò chơi */
  @Patch('update-name-in-game/:id')
  async updateNameInGame(
    @Param('id') id: string,
    @Body() body: { nameInGame: string },
  ) {
    return await this.userService.updateNameInQuizizzExam(id, body.nameInGame);
  }
}
