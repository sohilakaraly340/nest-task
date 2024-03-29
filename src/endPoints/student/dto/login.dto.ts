import { IsEmail, IsNotEmpty } from 'class-validator';

export class loginStudentDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}
