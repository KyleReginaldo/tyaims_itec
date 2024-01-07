import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from 'src/dto/register.dto';
import { User } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<User>
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const existingUser = await this.authRepository.findOne({
      where: { username: registerDto.username },
    });
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }
    const user = new User();
    user.username = registerDto.username;
    user.name = registerDto.name;
    user.password = registerDto.password;
    user.userRole = registerDto.userRole;
    return this.authRepository.save(user);
  }

  async login(username: string, password: string): Promise<User> {
    const existingUser = await this.authRepository.findOne({
      where: { username: username, password: password },
    });
    if (existingUser) {
      return existingUser;
    } else {
      throw new ConflictException('Invalid credentials');
    }
  }
}
