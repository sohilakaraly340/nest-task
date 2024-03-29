import {
  IsArray,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateStudentDto {
  // @IsNotEmpty()
  // @IsString()
  // id: number;

  @IsString()
  @Length(3, 20)
  name: string;

  @IsInt()
  @Min(3)
  @Max(22)
  age: number;

  @IsEmail()
  email: string;

  @IsArray()
  courses: [];
}
