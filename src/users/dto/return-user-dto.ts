import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsEnum } from 'class-validator';
import { UserRole } from 'src/common/enums/user-role.enum';

export class ReturnUserDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  username: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  fullname: string;
  @ApiProperty({ enum: ['Admin', 'Instructor', 'Learner'] })
  role: UserRole;
}
