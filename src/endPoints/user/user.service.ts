import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { loginDto } from './dto/loginDto';
import { Response } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('users') private UserModel,
    private jwt: JwtService,
  ) {}

  async create(userData: CreateUserDto) {
    let user = await this.UserModel.findOne({
      email: userData.email.toLowerCase(),
    });
    if (user) {
      return 'This email already exists.';
    }

    let passwordHash = await bcrypt.hash(
      userData.password,
      await bcrypt.genSalt(10),
    );
    userData.password = passwordHash;
    userData.email = userData.email.toLocaleLowerCase();

    let newUser = new this.UserModel(userData);
    await newUser.save();
    return 'You are registered successfully';
  }

  async login(userData: loginDto, res: Response) {
    let user = await this.UserModel.findOne({
      email: userData.email.toLowerCase(),
    });
    if (!user) {
      return 'invalid email or password';
    }
    let isTrue = await bcrypt.compare(userData.password, user.password);
    if (!isTrue) {
      return 'invalid email or password';
    }
    let jwt = this.jwt.sign({ email: user.email, role: user.role });
    res.header('jwt', jwt);
    return { token: jwt };
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
