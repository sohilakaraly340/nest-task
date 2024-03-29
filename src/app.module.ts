import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from './endPoints/course/course.module';
import { StudentModule } from './endPoints/student/student.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './endPoints/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './endPoints/user/user.gard';

@Module({
  imports: [
    CourseModule,
    MongooseModule.forRoot('mongodb://localhost:27017/uiStudent'),
    StudentModule,
    UserModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: RolesGuard }],
})
export class AppModule {}
