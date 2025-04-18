import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestQuestionsService } from './test-questions.service';
import { TestQuestionsController } from './test-questions.controller';
import { TestQuestion } from './entities/test-question.entity';
import { TestTemplate } from 'src/test-templates/entities/test-template.entity';
import { Question } from 'src/questions/entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TestQuestion, TestTemplate, Question])],
  controllers: [TestQuestionsController],
  providers: [TestQuestionsService],
})
export class TestQuestionsModule {}
