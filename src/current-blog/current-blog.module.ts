import { Global, Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CurrentBlog } from './current-blog';
@Global()
@Module({
  imports: [PrismaModule],
  providers: [CurrentBlog],
  exports: [CurrentBlog],
})
export class CurrentBlogModule { }
