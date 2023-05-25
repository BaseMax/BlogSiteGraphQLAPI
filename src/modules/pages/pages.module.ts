import { Module } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PagesResolver } from './pages.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BlogsModule } from '../blogs/blogs.module';

@Module({
  providers: [PagesService, PagesResolver],
  imports: [PrismaModule, BlogsModule]
})
export class PagesModule { }
