import { Global, Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { BlogsResolver } from './blogs.resolver';
import { BlogAttacherInterceptor } from './blog-attacher/blog-attacher.interceptor';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [BlogsService, BlogsResolver, BlogAttacherInterceptor],
  exports: [BlogsService, BlogAttacherInterceptor],
  controllers: [BlogsController],
})
export class BlogsModule { }
