import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { User } from '../users/entities/user.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<User> {
    const { username, email, password, fullname } = dto;

    const existing = await this.usersService.findByEmail(email);
    if (existing) {
      throw new Error('Email đã tồn tại');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.usersService.create({
      username,
      email,
      fullname,
      password_hash: hashedPassword,
      role: 'Learner',
    });

    return newUser;
  }

  async login(dto: LoginDto): Promise<{ access_token: string }> {
    const { email, password } = dto;
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Email không tồn tại');

    const user_password_hash = await this.usersService.getHashPassword(
      user.email,
    );

    if (!user_password_hash) {
      throw new UnauthorizedException('Không tìm thấy mật khẩu người dùng');
    }

    const isMatch = await bcrypt.compare(password, user_password_hash);
    if (!isMatch) throw new UnauthorizedException('Mật khẩu không đúng');

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
