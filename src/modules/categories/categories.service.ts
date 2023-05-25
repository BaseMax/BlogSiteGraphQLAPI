import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Blog, PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { Pagination } from 'src/utils/pagination.input';
import { CreateCategoryInput } from './dto/create-category.input';
import { SearchCategoryInput } from './dto/search-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Injectable()
export class CategoriesService {
  async search(input: SearchCategoryInput) {
    this.prisma.category.findMany()
    return withPagination(this.prisma, 'category', { where: { ...input.text ? { title: { search: input.text } } : {} } }, input);
  }

  async update(input: UpdateCategoryInput) {
    await this.findByIdOrFail(input.id);
    await this.prisma.category.update({
      where: {
        id_blogId: this.locateId(input.id)
      },
      data: {
        title: input.title
      }
    });
  }
  private locateId(id: string): { blogId: string; id: string; } {
    return { blogId: this.blogData().id, id: id };
  }

  async delete(id: string) {
    await this.findByIdOrFail(id);
    await this.prisma.category.delete({
      where: {
        id_blogId: this.locateId(id)
      }
    });
  }
  constructor(private prisma: PrismaService, @Inject("BlogData") private blogData: () => Blog) { }
  public async findByIdOrFail(id: string) {
    const category = await this.prisma.category.findUnique({ where: { id_blogId: this.locateId(id) } })
    if (!category) {
      throw new NotFoundException("category not found");
    }
    return category;
  }
  public async create(input: CreateCategoryInput) {
    const category = await this.prisma.category.create({
      data: {
        title: input.title,
        blogId: this.blogData().id
      }
    });
    console.log(category);
    return category;
  }

}

export async function withPagination<T, K>(prisma: PrismaClient, model: string, query: K, pagination: Pagination) {
  const [total, data] = await prisma.$transaction([
    prisma[model].count(query),
    prisma[model].findMany({
      ...query,
      skip: pagination.skip,
      take: pagination.limit,
    }),
  ]);
  return {
    total,
    data,
  }
}
