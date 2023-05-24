import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginUserInput } from './dto/login.input';
import { RegisterUserInputDto } from './dto/register.input';
import { UserDec } from './user.decorator';

@Controller('/auth')
export class AuthController {
  constructor(
    private service: AuthService,
  ) { }

  @Post('register')
  async register(@Body() input: RegisterUserInputDto) {
    const { user: { password, ...user }, token } = await this.service.register(input);
    return { user, token }
  }

  @Post('login')
  async login(@Body() input: LoginUserInput) {
    const { user: { password, ...user }, token } = await this.service.login(input);
    return { user, token }
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async me(@UserDec() user: any) {
    const { username, id, isAdmin } = user;
    return { username, id, isAdmin };
  }
}
