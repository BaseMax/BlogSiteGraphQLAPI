import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { BlogsService } from '../blogs.service';

@Injectable()
export class BlogAttacherInterceptor implements NestInterceptor {
  constructor(private service: BlogsService) { }
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = GqlExecutionContext.create(context).getContext().req;
    const blogId = req.headers.blogid;
    if (blogId) {
      const blog = await this.service.getByIdOrFail(blogId);
      req.blog = blog;
    }
    return next.handle();
  }
}
