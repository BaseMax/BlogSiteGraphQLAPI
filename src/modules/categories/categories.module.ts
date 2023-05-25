import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BlogsModule } from '../blogs/blogs.module';

@Module({
  providers: [CategoriesService, CategoriesResolver],
  imports: [PrismaModule, BlogsModule]
})
export class CategoriesModule { }
