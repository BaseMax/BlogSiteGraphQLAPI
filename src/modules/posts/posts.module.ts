import { forwardRef, Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BlogsModule } from '../blogs/blogs.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  providers: [PostsService, PostsResolver],
  imports: [PrismaModule, BlogsModule, forwardRef(() => CategoriesModule)],
  exports: [PostsService]
})
export class PostsModule { }
