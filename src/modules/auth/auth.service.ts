import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BlogsService } from '../blogs/blogs.service';
import { RegisterUserInputDto } from './dto/register.input';
import * as argon2 from 'argon2';
import { Blog } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { LoginUserInput } from './dto/login.input';

@Injectable()
export class AuthService {
  constructor(
    private blogsService: BlogsService,
    private prisma: PrismaService,
    private jwt: JwtService,
  ) { }
  async register(input: RegisterUserInputDto) {
    const userExists = await this.blogsService.getByUsername(input.username);
    if (userExists) {
      throw new BadRequestException('user exists');
    }

    const hashedPassword = await argon2.hash(input.password);
    const user = await this.prisma.blog.create({
      data: {
        ...input,
        password: hashedPassword,
        isAdmin: false
      },
    });

    const token = this.getToken(user);
    return {
      user,
      token,
    };
  }

  async login(input: LoginUserInput) {
    const user = await this.blogsService.getByUsername(input.username);
    if (!user || !(await argon2.verify(user.password, input.password))) {
      throw new BadRequestException('invalid username or password');
    }
    return {
      user,
      token: this.getToken(user),
    };
  }

  getToken(blog: Blog) {
    const token = this.jwt.sign({
      isAdmin: blog.isAdmin,
      username: blog.username,
      id: blog.id,
    });
    return token;
  }
}
