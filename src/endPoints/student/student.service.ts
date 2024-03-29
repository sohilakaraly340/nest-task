import { Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class StudentService {
  constructor(@InjectModel('Student') private studentModel) {}

  @UsePipes(ValidationPipe)
  async create(createStudentDto: CreateStudentDto) {
    let newStudent = new this.studentModel(createStudentDto);
    await newStudent.save();
    return { message: 'added', Data: newStudent };
  }

  findAll() {
    return this.studentModel.find({}).populate('courses');
  }

  async findOne(id: string) {
    let findStudent = await this.studentModel.findById(id).populate('courses');
    return findStudent;
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    let findStudentIndex = await this.studentModel.findByIdAndUpdate(
      id,
      updateStudentDto,
    );
    return updateStudentDto;
  }

  async findStudentCourse(id: string) {
    let findCourses = await this.studentModel
      .findOne({ _id: id })
      .populate('courses');
    return findCourses;
  }

  async remove(id: string) {
    let findStudentIndex = await this.studentModel.findByIdAndDelete(id);
    return findStudentIndex;
  }
}
