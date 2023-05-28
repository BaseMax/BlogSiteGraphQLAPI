import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Blog } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { withPagination } from 'src/utils';
import { CreatePageInput } from './dto/create-page.input';
import { SearchPageInput } from './dto/search-page.input';
import { UpdatePageInput } from './dto/update-page.input';

@Injectable()
export class PagesService {
  async search(input: SearchPageInput) {
    const query = { where: { ...input.text ? { OR: [{ title: { search: input.text } }, { content: { search: input.text } }] } : {} } };
    return withPagination(this.prisma, 'page', query, input);
  }

  async update(input: UpdatePageInput) {
    await this.findByIdOrFail(input.id);
    return this.prisma.page.update({
      where: {
        id_blogId: this.locateId(input.id)
      },
      data: {
        title: input.title,
        content: input.content,
      }
    });
  }
  private locateId(id: string): { blogId: string; id: string; } {
    return { blogId: this.blogData().id, id: id };
  }

  async delete(id: string) {
    await this.findByIdOrFail(id);
    await this.prisma.page.delete({
      where: {
        id_blogId: this.locateId(id)
      }
    });
  }
  constructor(private prisma: PrismaService, @Inject("BlogData") private blogData: () => Blog) { }
  public async findByIdOrFail(id: string) {
    const page = await this.prisma.page.findUnique({ where: { id_blogId: this.locateId(id) } })
    if (!page) {
      throw new NotFoundException("page not found");
    }
    return page;
  }
  public async create(input: CreatePageInput) {
    const page = await this.prisma.page.create({
      data: {
        content: input.content,
        title: input.title,
        blogId: this.blogData().id
      }
    });
    console.log(page);
    return page;
  }

}


