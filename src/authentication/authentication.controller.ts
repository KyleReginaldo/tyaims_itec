import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from 'src/dto/register.dto';
import { User } from 'src/typeorm';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<User> {
    return await this.authenticationService.register(registerDto);
  }

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string
  ): Promise<User> {
    return await this.authenticationService.login(username, password);
  }
}
