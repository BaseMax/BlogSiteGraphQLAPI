import { Global, Module, Scope } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { BlogsResolver } from './blogs.resolver';
import { BlogAttacherInterceptor } from './blog-attacher/blog-attacher.interceptor';
import { CONTEXT } from '@nestjs/graphql';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [BlogsService, BlogsResolver, BlogAttacherInterceptor, {
    provide: "BlogData",
    useFactory: (ctx) => {
      return () => ctx.req.blog;
    },
    inject: [CONTEXT],
    scope: Scope.REQUEST
  }],
  exports: [BlogsService, BlogAttacherInterceptor, "BlogData"],
  controllers: [BlogsController],
})
export class BlogsModule { }
