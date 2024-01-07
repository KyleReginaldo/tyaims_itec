import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/create.user.dto';
import { UpdateUserDto } from 'src/dto/update.user.dto';
import { User } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser).catch((e) => {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    });
  }
  async fetchAllUsers(): Promise<User[]> {
    return this.usersRepository.find().catch((e) => {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    });
  }

  async fetchUserById(id: number): Promise<User> {
    return this.usersRepository
      .findOne({
        where: { id: id },
      })
      .catch((e) => {
        throw new HttpException(e, HttpStatus.BAD_REQUEST);
      });
  }
  async deleteUser(id: number) {
    return this.usersRepository
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('id = :id', { id: id })
      .execute()
      .catch((e) => {
        throw new HttpException(e, HttpStatus.NOT_FOUND);
      });
  }

  async updateUser(updateUserDto: UpdateUserDto, id: number) {
    this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set(updateUserDto)
      .where('id = :id', { id: id })
      .execute()
      .catch((e) => {
        throw new HttpException(e, HttpStatus.NOT_FOUND);
      });
  }
}
