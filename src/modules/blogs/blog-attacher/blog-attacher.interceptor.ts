import {
  BadRequestException,
  CallHandler,
  CanActivate,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { BlogsService } from '../blogs.service';

@Injectable()
export class BlogAttacherInterceptor implements CanActivate {
  constructor(private service: BlogsService) { }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = GqlExecutionContext.create(context).getContext().req;
    const blogId = req.headers.blogid;
    if (blogId) {
      const blog = await this.service.getByIdOrFail(blogId);
      req.blog = blog;
    } else {
      throw new BadRequestException("blog id header missing")
    }
    return true;
  }

}
