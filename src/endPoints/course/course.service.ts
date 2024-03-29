import { Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CourseService {
  constructor(@InjectModel('Course') private courseModel) {}

  @UsePipes(ValidationPipe)
  async create(createCourseDto: CreateCourseDto) {
    let newCourse = new this.courseModel(createCourseDto);
    await newCourse.save();
    return { message: 'added', Data: newCourse };
  }

  findAll() {
    return this.courseModel.find({});
  }

  async findOne(id: string) {
    let findCourse = await this.courseModel.findById(id);
    return findCourse;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    let findStudentIndex = await this.courseModel.findByIdAndUpdate(
      id,
      UpdateCourseDto,
    );
    return UpdateCourseDto;
  }

  async remove(id: string) {
    let findStudentIndex = await this.courseModel.findByIdAndDelete(id);
    return findStudentIndex;
  }
}
