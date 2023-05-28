import { forwardRef, Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BlogsModule } from '../blogs/blogs.module';
import { PostsModule } from '../posts/posts.module';

@Module({
  providers: [CategoriesService, CategoriesResolver],
  imports: [PrismaModule, BlogsModule,forwardRef(()=>PostsModule)],
  exports: [CategoriesService]
})
export class CategoriesModule { }
