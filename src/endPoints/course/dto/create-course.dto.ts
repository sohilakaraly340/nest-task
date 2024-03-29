import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCourseDto {
  // @IsNotEmpty()
  // @IsString()
  // id: number;

  @IsString()
  @Length(3, 20)
  name: string;

  @IsNotEmpty()
  degree: number;
}
