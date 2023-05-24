import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';

@Module({
  imports: [PrismaModule],
  providers: [BlogsService],
  exports: [BlogsService],
  controllers: [BlogsController],
})
export class BlogsModule { }
