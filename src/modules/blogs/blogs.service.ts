import { Injectable } from '@nestjs/common';
import { Blog } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BlogsService {
  constructor(private prisma: PrismaService) { }
  getById(id: string): Promise<Blog | null> {
    return this.prisma.blog.findUnique({ where: { id } });
  }
  getByUsername(username: string): Promise<Blog | null> {
    return this.prisma.blog.findUnique({ where: { username } });
  }
}
