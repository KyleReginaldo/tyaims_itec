import { Body, Controller, Get, Param, Put,Post, Delete, ValidationPipe, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/typeorm';
import { CreateUserDto } from 'src/dto/create.user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
 
  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createUserDto: CreateUserDto) {
      return this.usersService.createUser(createUserDto);
  }
}
