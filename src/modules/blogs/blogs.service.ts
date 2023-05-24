import { Injectable, NotFoundException } from '@nestjs/common';
import { Blog } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BlogsService {

  async getByIdOrFail(id: string): Promise<Blog> {
    const blog = await this.prisma.blog.findUnique({ where: { id } });
    if (!blog) {
      throw new NotFoundException("blog not found");
    }
    return blog;
  }
  constructor(private prisma: PrismaService) { }
  getById(id: string): Promise<Blog | null> {
    return this.prisma.blog.findUnique({ where: { id } });
  }
  getByUsername(username: string): Promise<Blog | null> {
    return this.prisma.blog.findUnique({ where: { username } });
  }
  async getByUsernameOrFail(username: string): Promise<Blog> {
    const blog = await this.prisma.blog.findUnique({ where: { username } });
    if (!blog) {
      throw new NotFoundException("blog not found");
    }
    return blog;
  }
}
