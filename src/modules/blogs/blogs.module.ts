import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BlogsService } from './blogs.service';

@Module({
  imports: [PrismaModule],
  providers: [BlogsService],
  exports: [BlogsService],
})
export class BlogsModule { }
