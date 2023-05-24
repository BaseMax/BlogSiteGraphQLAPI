import { UseInterceptors } from '@nestjs/common';
import { Context, Query, Resolver } from '@nestjs/graphql';
import { CurrentBlog } from 'src/current-blog/current-blog';
import { BlogAttacherInterceptor } from './blog-attacher/blog-attacher.interceptor';
import { Blog } from './blog.model';

@UseInterceptors(BlogAttacherInterceptor)
@Resolver()
export class BlogsResolver {
  constructor(private currentBlog: CurrentBlog) { }
  @Query(() => Blog)
  blog(@Context() ctx) {
    return ctx.req.blog;
  }
}
