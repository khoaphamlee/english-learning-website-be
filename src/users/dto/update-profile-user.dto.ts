import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateProfileUserDto extends PickType(CreateUserDto, [
  'username',
] as const) {}
