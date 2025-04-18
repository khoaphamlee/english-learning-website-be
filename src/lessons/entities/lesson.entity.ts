import { Discussion } from 'src/discussions/entities/discussion.entity';
import { LearningPath } from 'src/learning-paths/entities/learning-path.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
} from 'typeorm';
  
@Entity({ name: 'lessons' })
export class Lesson {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
      type: 'enum',
      enum: ['Vocabulary', 'Grammar'],
      nullable: true
    })
    lesson_focus: 'Vocabulary' | 'Grammar' | null;    
  
    @Column({
      type: 'enum',
      enum: ['IT', 'Business', 'Finance', 'Healthcare', 'Hospitality'],
      nullable: true
    })
    subject: 'IT' | 'Business' | 'Finance' | 'Healthcare' | 'Hospitality' | null;
  
    @Column({
      type: 'enum',
      enum: ['Tense', 'Passive Voice', 'Conditional Sentence'],
      nullable: true
    })
    grammar_point: 'Tense' | 'Passive Voice' | 'Conditional Sentence' | null;
    
    @Column({
      type: 'enum',
      enum: ['Video', 'Audio', 'Quiz'],
      array: true,
    })
    lesson_type: ('Video' | 'Audio' | 'Quiz')[];
    
    @Column()
    content_url: string;
  
    @Column()
    title: string;
  
    @Column()
    description: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Discussion, discussion => discussion.lesson)
    discussions: Discussion[];

    @ManyToOne(() => LearningPath, learningPath => learningPath.lessons)
    learningPath: LearningPath;
}
  