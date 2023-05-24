import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { Blog } from '../blogs/blog.model';
import { BlogsService } from '../blogs/blogs.service';
import { AuthGuard } from './auth.guard';
import { UserDec } from './userId.decorator';

@Resolver()
export class AuthResolver {
  constructor(
    private blogsService: BlogsService,
  ) { }
  @UseGuards(AuthGuard)
  @Query(() => Blog)
  async user(@UserDec() userId: string) {
    const { password: _password, ...data } = (await this.blogsService.getByUsername(userId))!;
    return data;
  }
}
